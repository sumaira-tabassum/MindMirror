import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeState } from "../components/context/HomeStateContext";

export default function Home() {
  const [modelOpen, setModelOpen] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);
  const [infoModel, setInfoModel] = useState(null);
  const [modeOpen, setModeOpen] = useState(false);
  const [showModeInfo, setShowModeInfo] = useState(false);
  const [infoMode, setInfoMode] = useState(null);

  const navigate = useNavigate();
  const {
    referenceFiles,
    setReferenceFiles,
    comparisonFiles,
    setComparisonFiles,
    comparisonResult,
    setComparisonResult,
    readyToFetch,
    setReadyToFetch,
    loading,
    setLoading,
    showNewComparison,
    setShowNewComparison,
    dropdowns,
    setDropdowns,
    resetAll
  } = useHomeState();

  // const [referenceFiles, setReferenceFiles] = useState([]);
  // const [comparisonFiles, setComparisonFiles] = useState([]);

  /* -------------------------------
     VALIDATION BASED ON MODE
  -------------------------------- */
  function validateFiles() {
    if (dropdowns.mode === "One-to-One Comparison") {
      if (referenceFiles.length !== 1 || comparisonFiles.length !== 1) {
        alert("One-to-One comparison requires exactly ONE file in both sections.");
        return false;
      }
    }

    if (dropdowns.mode === "Reference-Based Comparison") {
      if (referenceFiles.length !== 1) {
        alert("Reference document requires exactly ONE file.");
        return false;
      }
      if (comparisonFiles.length < 1) {
        alert("Upload at least ONE comparison document.");
        return false;
      }
    }

    return true;
  }

async function handleCompare() {
  if (!validateFiles()) return;

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("file1", referenceFiles[0]);
    formData.append("file2", comparisonFiles[0]);

    const response = await fetch("http://localhost:5000/compare", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Comparison failed");

    const result = await response.json();

    const formattedResult = {
      pair: `${referenceFiles[0].name} vs ${comparisonFiles[0].name}`,
      score: Number(result.similarityScore.toFixed(2)),
      status: "Complete",
      color:
        result.similarityScore > 75
          ? "red"
          : result.similarityScore > 40
          ? "amber"
          : "green",
    };

    setComparisonResult(formattedResult);  // ✅ save the result
    setReadyToFetch(true);                 // ✅ show Fetch Results button
    setShowNewComparison(true);            // ✅ show New Comparison button

  } catch (error) {
    alert("Error while comparing documents");
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  function handleFetchResults() {
    if(!comparisonResult) return;
    navigate("/results", {state:
      {comparisonResult} });
  }

  function handleNewComparison() {
    resetAll();
    setReferenceFiles([]);
    setComparisonFiles([]);
    setComparisonResult([null]);
    setReadyToFetch(false);
    setShowNewComparison(false);
  }

  const canUpload = Boolean(dropdowns.mode) && Boolean(dropdowns.model);
  // ✅ Step 2a: Determine if Compare button should be disabled
  const isCompareDisabled =
    !canUpload ||
    referenceFiles.length === 0 ||
    comparisonFiles.length === 0 ||
    loading;

  const aiModels = [
    {
      name: "FastText Similarity (Basic)",
      level: "Basic",
      description: "Fast, lightweight semantic comparison. Best for small documents and quick checks."
    },
    {
      name: "Transformer Semantic Model (Advanced)",
      level: "Advanced",
      description: "Deep meaning-based comparison using transformer models. Recommended for academic documents."
    },
    {
      name: "GPT-Based Document Analyzer (Recommended)",
      level: "Premium",
      description: "AI reasoning model that provides similarity, explanations, and summaries. Best for high accuracy."
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Compare your documents instantly
      </h1>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Comparison Mode Selection */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Mode Selection</label>

          {/* Selected box */}
          <div
            onClick={() => setModeOpen(!modeOpen)}
            className="flex items-center justify-between w-full p-2 rounded-md border bg-white cursor-pointer"
          >
            <span>{dropdowns.mode || "Select Comparison Mode"}</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </div>

          {/* Dropdown options */}
          {modeOpen && (
            <div className="absolute z-30 mt-1 w-full bg-white border rounded-md shadow-md">
              {[
                {
                  name: "One-to-One Comparison",
                  description: "Upload one document in first field and one document in second field. Both are compared."
                },
                {
                  name: "Reference-Based Comparison",
                  description: "First document is reference. Other documents (two or more) are compared one-by-one to reference."
                }
              ].map((mode, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {/* Text part (click to select) */}
                  <span
                    onClick={() => {
                      setDropdowns({ ...dropdowns, mode: mode.name });
                      setModeOpen(false);       // Close dropdown
                      setShowModeInfo(false);   // Hide info card if open
                      setInfoMode(null);        // Clear infoMode
                      setReferenceFiles([]);    // Reset uploaded files
                      setComparisonFiles([]);
                    }}
                    className="flex-1"  // Important: take available space so info icon doesn't block
                  >
                    {mode.name}
                  </span>

                  {/* Info icon */}
                  <span
                    className="material-symbols-outlined text-base cursor-pointer ml-2"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ Prevent the click from affecting parent span
                      if (infoMode === mode) {
                        setShowModeInfo(false);
                        setInfoMode(null);
                      } else {
                        setInfoMode(mode);
                        setShowModeInfo(true);
                      }
                    }}
                  >
                    info
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mode Info Card */}
        {showModeInfo && infoMode && (
          <div className="absolute z-40 w-64 p-3 bg-white border rounded-md shadow-md mt-1">
            <h3 className="font-semibold">{infoMode.name}</h3>
            <p className="text-sm text-gray-600">{infoMode.description}</p>
          </div>
        )}


        {/* AI Model Selection */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            AI Model Selection
          </label>

          {/* Selected box */}
          <div
            onClick={() => setModelOpen(!modelOpen)}
            className="flex items-center justify-between w-full p-2 rounded-md border bg-white cursor-pointer"
          >
            <span>
              {dropdowns.model || "Select AI Model"}
            </span>
            <span className="material-symbols-outlined text-base">
              expand_more
            </span>
          </div>

          {/* Dropdown options */}
          {modelOpen && (
            <div className="absolute z-30 mt-1 w-full bg-white border rounded-md shadow-md">
              {aiModels.map((model, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {/* Model name clickable to select */}
                  <span
                    onClick={() => {
                      setDropdowns({ ...dropdowns, model: model.name });
                      setModelOpen(false);
                      setShowModelInfo(false);
                      setInfoModel(null);
                    }}
                  >
                    {model.name}
                  </span>

                  {/* Info icon */}
                  <span
                    className="material-symbols-outlined text-base cursor-pointer ml-2"
                    onClick={() => {
                      // toggle info card
                      if (infoModel === model) {
                        setShowModelInfo(false);
                        setInfoModel(null);
                      } else {
                        setInfoModel(model);
                        setShowModelInfo(true);
                      }
                    }}
                  >
                    info
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        {showModelInfo && infoModel && (
          <div className="absolute z-40 w-64 p-3 bg-white border rounded-md shadow-md mt-1">
            <h3 className="font-semibold">{infoModel.name}</h3>
            <p className="text-sm text-gray-600">{infoModel.description}</p>
            <p className="text-xs font-medium text-gray-500 mt-1">Level: {infoModel.level}</p>
          </div>
        )}

        <Dropdown
          label="Upload Type"
          value={dropdowns.uploadType}
          onChange={(e) => setDropdowns({ ...dropdowns, uploadType: e.target.value })}
          options={["Full Document", "Text Only", "Tables Only"]}
          placeholder="Select Upload Type"
        />
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UploadCard
          title="Reference Document"
          files={referenceFiles}
          setFiles={setReferenceFiles}
          allowMultiple={false}
          disabled={!canUpload}
        />
        <UploadCard
          title="Comparison Document"
          files={comparisonFiles}
          setFiles={setComparisonFiles}
          allowMultiple={dropdowns.mode === "Reference-Based Comparison"}
          disabled={!canUpload}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={readyToFetch ? handleFetchResults : handleCompare}
          disabled={isCompareDisabled} // ✅ use the new variable
          className={`px-8 py-3 rounded-lg font-bold text-white bg-primary
              ${isCompareDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"}`}
        >
          {loading ? "Processing..." : readyToFetch ? "Fetch Results" : "Compare"}
        </button>


        {showNewComparison && (
          <button
            onClick={handleNewComparison}
            className="px-8 py-3 rounded-lg font-bold text-white bg-primary"
          >
            New Comparison
          </button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------
   DROPDOWN
-------------------------------- */
function Dropdown({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-md border"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/* -------------------------------
   UPLOAD CARD
-------------------------------- */
function UploadCard({ title, files, setFiles, allowMultiple, disabled }) {

  function processFiles(selectedFiles) {
    if (disabled) {
      alert("Please select Mode and AI Model first.");
      return;
    }
    const incoming = Array.from(selectedFiles);

    for (let file of incoming) {
      if (file.size / 1024 / 1024 > 25) {
        alert(`${file.name} exceeds 25MB`);
        return;
      }
    }

    if (!allowMultiple && incoming.length > 1) {
      alert("Only one file allowed.");
      return;
    }
    if (title === "Refernce Document" && incoming.length > 1) {
      alert("Reference Document must be exactly one file.");
      return;
    }

    setFiles(allowMultiple ? [...files, ...incoming] : incoming);
  }

  function handleInputChange(e) {
    processFiles(e.target.files);
    e.target.value = ""; // ⭐ reset input (smooth UX)
  }

  function handleDrop(e) {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`flex flex-col gap-3 rounded-xl border-2 border-dashed border-mint-leaf-300
             dark:border-mint-leaf-700 bg-mint-leaf-50 dark:bg-mint-leaf-900/30
             p-6 text-center transition-transform duration-200
      hover:scale-[1.03] hover:shadow-lg dark:hover:bg-slate-800/50
             ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}

    >
      <p className="text-lg font-semibold">{title}</p>

      <input
        type="file"
        multiple={allowMultiple}
        hidden
        id={title}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <label htmlFor={title} className="cursor-pointer flex flex-col items-center gap-2">
        <span className="material-symbols-outlined text-4xl text-primary">
          upload_file
        </span>

        {/* 👇 RESTORED TEXT */}
        <p className="text-sm font-medium text-primary">
          Drag & drop or click to select
        </p>

        <p className="text-xs text-slate-500">
          PDF, DOCX, TXT up to 25MB
        </p>
      </label>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2 text-left">
          {files.map(file => (
            <FileItem key={file.name} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------
   FILE ITEM (ICON + COLOR)
-------------------------------- */
function FileItem({ file }) {
  const ext = file.name.split(".").pop().toLowerCase();

  const icon =
    ext === "pdf" ? "picture_as_pdf" :
      ext === "doc" || ext === "docx" ? "description" :
        "article";

  const color =
    ext === "pdf" ? "text-red-500" :
      ext === "doc" || ext === "docx" ? "text-blue-500" :
        "text-gray-500";

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <span className={`material-symbols-outlined ${color}`}>
        {icon}
      </span>
      <span className="truncate">{file.name}</span>
    </div>
  );
}
