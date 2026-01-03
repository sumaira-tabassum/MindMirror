import React from "react";

export default function History() {
  return (
    <div className="space-y-6">

      {/* ========= PAGE HEADER ========= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Recent Comparisons
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Browse your previous document comparison results
        </p>
      </div>

      {/* ========= SEARCH + FILTERS ========= */}
      <div className="space-y-4">
        
        {/* Search bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>

          <input
            type="text"
            placeholder="Search documents..."
            className="
              w-full pl-10 pr-3 py-3 rounded-xl
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              placeholder-slate-400
              focus:ring-2 focus:ring-primary focus:outline-none
            "
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <FilterChip label="All" active />
          <FilterChip label="Completed" />
          <FilterChip label="Score: High to Low" icon="expand_more" />
          <FilterChip label="This Week" />
        </div>
      </div>

      {/* ========= TODAY SECTION ========= */}
      <SectionTitle title="Today" />

      <ComparisonCard
        status="Completed"
        statusColor="emerald"
        time="2:30 PM"
        fileA="Contract_v2_Final.pdf"
        fileAIcon="picture_as_pdf"
        fileB="Contract_v1_Draft.pdf"
        fileBIcon="picture_as_pdf"
        score="98%"
        scoreColor="primary"
        buttonType="primary"
      />

      <ComparisonCard
        status="Completed"
        statusColor="emerald"
        time="11:45 AM"
        fileA="Q3_Report_Rev2.docx"
        fileAIcon="description"
        fileB="Q3_Report_Orig.docx"
        fileBIcon="description"
        score="75%"
        scoreColor="amber"
        buttonType="outline"
      />

      {/* ========= YESTERDAY SECTION ========= */}
      <SectionTitle title="Yesterday" />

      <ProcessingCard />

      <ComparisonCard
        status="Completed"
        statusColor="emerald"
        time="Oct 23"
        fileA="Policy_Legacy.pdf"
        fileAIcon="picture_as_pdf"
        fileB="Policy_New_2024.pdf"
        fileBIcon="picture_as_pdf"
        score="24%"
        scoreColor="red"
        buttonType="outline"
      />
    </div>
  );
}

/* ========================= */
/*     REUSABLE COMPONENTS   */
/* ========================= */

function FilterChip({ label, icon, active }) {
  return (
    <button
      className={
        active
          ? "px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold"
          : "px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1"
      }
    >
      {label}
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
    </button>
  );
}

function SectionTitle({ title }) {
  return (
    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
      {title}
    </h3>
  );
}

function ComparisonCard({
  status,
  statusColor,
  time,
  fileA,
  fileAIcon,
  fileB,
  fileBIcon,
  score,
  scoreColor,
  buttonType,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow border border-slate-200/50 dark:border-slate-700 space-y-4">

      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full bg-${statusColor}-500`} />
          <span className={`text-xs font-medium text-${statusColor}-600 dark:text-${statusColor}-400`}>
            {status}
          </span>
          <span className="text-xs text-slate-400">• {time}</span>
        </div>

        <button className="text-slate-400 hover:text-slate-600">
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </div>

      {/* File Info Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <FileItem icon={fileAIcon} name={fileA} bold />
          <div className="pl-1">
            <span className="material-symbols-outlined text-slate-400 text-base rotate-90 block">
              sync_alt
            </span>
          </div>
          <FileItem icon={fileBIcon} name={fileB} />
        </div>

        {/* Score circle */}
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-${scoreColor}-500/20 bg-${scoreColor}-500/10`}
          >
            <span className={`text-sm font-bold text-${scoreColor}-600`}>
              {score}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Match</span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
        <button
          className={
            buttonType === "primary"
              ? "w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-sm font-semibold"
              : "w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
          }
        >
          View Result
        </button>
      </div>
    </div>
  );
}

function FileItem({ icon, name, bold }) {
  return (
    <div className="flex items-center gap-2 truncate">
      <span className={`material-symbols-outlined text-slate-400 text-lg`}>
        {icon}
      </span>
      <span
        className={`truncate max-w-[200px] text-sm ${
          bold
            ? "font-semibold text-slate-900 dark:text-white"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

function ProcessingCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow border border-slate-200/50 dark:border-slate-700 space-y-4 opacity-95">

      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-medium text-primary">Processing...</span>
        </div>

        <button className="text-slate-400 hover:text-slate-600">
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </div>

      {/* Files */}
      <div className="flex items-center justify-between gap-4 opacity-75">
        <div className="flex-1 space-y-2">
          <FileItem icon="image" name="Scan_0041.png" bold />
          <div className="pl-1">
            <span className="material-symbols-outlined text-slate-400 text-base rotate-90 block">
              sync_alt
            </span>
          </div>
          <FileItem icon="image" name="Scan_0042.png" />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            <span className="material-symbols-outlined text-slate-400 animate-spin">
              progress_activity
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Wait</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div className="h-full w-2/3 bg-primary animate-pulse"></div>
      </div>
    </div>
  );
}
