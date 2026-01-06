import React, { useState } from "react"; 
import Navbar from "../components/layout/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize results state
  const initialResults = Array.isArray(location.state?.comparisonResult)
    ? location.state.comparisonResult
    : location.state?.comparisonResult
      ? [location.state.comparisonResult]
      : [];

  const [results, setResults] = useState(initialResults);

  // Badge color mapping
  const getBadgeColor = (color) => {
    switch (color) {
      case "red":
        return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300";
      case "amber":
        return "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300";
      case "green":
        return "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300";
      default:
        return "";
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const openModal = (doc) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoc(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* <Navbar toggleSidebar={() => { }} /> */}

      {/* Top buttons */}
      <div className="flex justify-between items-center px-6 pt-2">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 bg-slate-700 dark:bg-slate-800 text-slate-100 px-4 py-2 rounded-lg text-sm font-medium
                     hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Homepage
        </button>

        <button className="flex items-center gap-2 bg-slate-700 dark:bg-slate-800 text-slate-100 px-4 py-2 rounded-lg text-sm font-medium
                           hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors">
          <span className="material-symbols-outlined text-lg">download</span>
          Export Report
        </button>
      </div>

      {/* Main Table */}
      <main className="flex-1 p-6 lg:p-8 pt-4">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-2xl font-bold tracking-tight mb-6">
            Comparison Results
          </h1>

          <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold">Document Pair</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">Similarity Score</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">Status</th>
                    <th className="relative py-3.5 pl-3 pr-6"><span className="sr-only">View Details</span></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-300 dark:divide-slate-700">
                  {results.map((res, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium">{res.pair}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {res.score !== undefined && res.score !== null ? (
                          <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 font-medium ${getBadgeColor(res.color)}`}>
                            {res.score.toFixed(2)}%
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">N/A</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-700 dark:text-slate-400">
                        {res.status || "Unknown"}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                        <button
                          onClick={() => openModal(res)}
                          className={`rounded-md px-3 py-1.5 text-sm font-medium text-slate-100
                                     bg-slate-700 dark:bg-slate-800 hover:bg-slate-600 dark:hover:bg-slate-700
                                     transition-colors ${res.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                          disabled={res.disabled}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-11/12 max-w-3xl p-4 relative">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{selectedDoc.pair}</h2>
              <div className="flex items-center gap-2">
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 p-1 rounded">
                  <span className="material-symbols-outlined text-base">download</span>
                </button>
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 p-1 rounded">
                  <span className="material-symbols-outlined text-base">open_in_full</span>
                </button>
                <button onClick={closeModal} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 p-1 rounded">
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded bg-slate-50 dark:bg-slate-700">
                <h3 className="font-semibold mb-2">Document 1</h3>
                <p>Report content of first document...</p>
              </div>
              <div className="p-4 border rounded bg-slate-50 dark:bg-slate-700">
                <h3 className="font-semibold mb-2">Document 2</h3>
                <p>Report content of second document...</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
