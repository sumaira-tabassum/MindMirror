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
      comparisonFiles.forEach(file => formData.append("file2", file));
      formData.append("model", dropdowns.model);

      const response = await fetch("http://localhost:5000/compare", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Comparison failed");

      const data = await response.json();

      const resultsArray = [];
      if (data.results && Array.isArray(data.results)) {
        data.results.forEach(r => {
          resultsArray.push({
            pair: r.pair,
            score: Number(r.similarity.toFixed(2)),
            status: "Complete",
            color: r.similarity > 75 ? "red" : r.similarity > 40 ? "amber" : "green",
          });
        });
      } else if (data.similarity !== undefined) {
        resultsArray.push({
          pair: `${referenceFiles[0].name} vs ${comparisonFiles[0].name}`,
          score: Number(data.similarity.toFixed(2)),
          status: "Complete",
          color: data.similarity > 75 ? "red" : data.similarity > 40 ? "amber" : "green",
        });
      }

      setComparisonResult(resultsArray);
      setReadyToFetch(true);
      setShowNewComparison(true);

    } catch (error) {
      alert("Error while comparing documents");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleFetchResults() {
    if (!comparisonResult) return;
    navigate("/results", { state: { comparisonResult } });
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
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">
        Compare your documents instantly
      </h1>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Mode Selection */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Mode Selection
          </label>

          <div
            onClick={() => setModeOpen(!modeOpen)}
            className="flex items-center justify-between w-full p-2 rounded-md border
                       bg-white dark:bg-slate-800
                       text-slate-900 dark:text-slate-100
                       border-slate-300 dark:border-slate-700
                       cursor-pointer"
          >
            <span>{dropdowns.mode || "Select Comparison Mode"}</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </div>

          {modeOpen && (
            <div className="absolute z-30 mt-1 w-full rounded-md border shadow-md
                            bg-white dark:bg-slate-800
                            border-slate-300 dark:border-slate-700">
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
                  className="flex items-center justify-between p-2
                             hover:bg-slate-100 dark:hover:bg-slate-700
                             cursor-pointer"
                >
                  <span
                    onClick={() => {
                      setDropdowns({ ...dropdowns, mode: mode.name });
                      setModeOpen(false);
                      setShowModeInfo(false);
                      setInfoMode(null);
                      setReferenceFiles([]);
                      setComparisonFiles([]);
                    }}
                    className="flex-1"
                  >
                    {mode.name}
                  </span>

                  <span
                    className="material-symbols-outlined text-base ml-2 text-slate-500"
                    onClick={(e) => {
                      e.stopPropagation();
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
          <div className="absolute z-40 w-64 p-3 rounded-md border shadow-md
                          bg-white dark:bg-slate-800
                          border-slate-300 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {infoMode.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {infoMode.description}
            </p>
          </div>
        )}

        {/* AI Model Selection */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            AI Model Selection
          </label>

          <div
            onClick={() => setModelOpen(!modelOpen)}
            className="flex items-center justify-between w-full p-2 rounded-md border
                       bg-white dark:bg-slate-800
                       text-slate-900 dark:text-slate-100
                       border-slate-300 dark:border-slate-700
                       cursor-pointer"
          >
            <span>{dropdowns.model || "Select AI Model"}</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </div>
          {/* Dropdown options */}
          {modelOpen && (
            <div className="absolute z-30 mt-1 w-full rounded-md border shadow-md
                            bg-white dark:bg-slate-800
                            border-slate-300 dark:border-slate-700">
              {aiModels.map((model, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2
                             hover:bg-slate-100 dark:hover:bg-slate-700
                             cursor-pointer"
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
                    className="material-symbols-outlined text-base cursor-pointer ml-2 text-slate-500 dark:text-slate-400"
                    onClick={() => {
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
          <div className="absolute z-40 w-64 p-3 rounded-md border shadow-md mt-1
                          bg-white dark:bg-slate-800
                          border-slate-300 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{infoModel.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{infoModel.description}</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Level: {infoModel.level}
            </p>
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
          disabled={isCompareDisabled}
          className={`px-8 py-3 rounded-lg font-bold text-slate-100 bg-slate-700
                      ${isCompareDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-slate-600 dark:hover:bg-slate-600"}`}
        >
          {loading ? "Processing..." : readyToFetch ? "Fetch Results" : "Compare"}
        </button>

        {showNewComparison && (
          <button
            onClick={handleNewComparison}
            className="px-8 py-3 rounded-lg font-bold text-slate-100 bg-slate-700
                       hover:bg-slate-600 dark:hover:bg-slate-600"
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
      <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-md border border-slate-300 dark:border-slate-700
                   bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
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
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`flex flex-col gap-3 rounded-xl border-2 border-dashed
                 border-slate-300 dark:border-slate-700
                 bg-white dark:bg-slate-800
                 p-6 text-center transition-transform duration-200
                 hover:scale-[1.03] hover:shadow-lg
                 hover:bg-slate-100 dark:hover:bg-slate-700
                 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</p>

      <input
        type="file"
        multiple={allowMultiple}
        hidden
        id={title}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <label htmlFor={title} className="cursor-pointer flex flex-col items-center gap-2">
        <span className="material-symbols-outlined text-4xl text-slate-700 dark:text-slate-100">
          upload_file
        </span>

        <p className="text-sm font-medium text-slate-700 dark:text-slate-100">
          Drag & drop or click to select
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          PDF, DOCX, TXT up to 25MB
        </p>
      </label>

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
    "text-slate-500 dark:text-slate-400";

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <span className={`material-symbols-outlined ${color}`}>
        {icon}
      </span>
      <span className="truncate text-slate-900 dark:text-slate-100">{file.name}</span>
    </div>
  );
}
