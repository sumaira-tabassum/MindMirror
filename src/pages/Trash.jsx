import React from "react";

const colorMap = {
  red: {
    bg: "bg-red-100 dark:bg-red-500/20",
    text: "text-red-600 dark:text-red-400",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
  },
};

export default function Trash() {
  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">
              delete_sweep
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Trash / Recycle Bin
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your deleted files and recovery options
            </p>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-full">
          <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-lg">
            info
          </span>
          <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-500">
            Auto-deletion in 30 days
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col xl:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-3 items-center">
          <div className="relative w-full max-w-lg">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 h-11 rounded-xl bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary/20 text-sm"
              placeholder="Search deleted files by name..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-95 transition">
            <span className="material-symbols-outlined text-lg">restore</span>
            Restore Selected
          </button>
          <button className="flex items-center gap-2 h-10 px-5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-red-500 hover:border-red-300 transition">
            <span className="material-symbols-outlined text-lg">delete</span>
            Empty Trash
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="p-5 w-12">
                  <input type="checkbox" />
                </th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase">
                  File Name
                </th>
                <th className="p-5 hidden md:table-cell text-xs font-bold text-slate-500 uppercase">
                  Original Location
                </th>
                <th className="p-5 hidden lg:table-cell text-xs font-bold text-slate-500 uppercase">
                  Deletion Date
                </th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              <TrashRow
                name="Q3_Financial_Audit_Final.pdf"
                location="Finance / 2023 Audits"
                date="Oct 24, 2023"
                status="28 days left"
                icon="picture_as_pdf"
                color="red"
              />
              <TrashRow
                name="Legal_Brief_Merger_Draft.docx"
                location="Legal / Pending"
                date="Oct 23, 2023"
                status="27 days left"
                icon="article"
                color="blue"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TrashRow({ name, location, date, status, icon, color }) {
  const styles = colorMap[color];

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
      <td className="p-5">
        <input type="checkbox" />
      </td>

      <td className="p-5">
        <div className="flex items-center gap-4">
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center ${styles.bg} ${styles.text}`}
          >
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">
            {name}
          </span>
        </div>
      </td>

      <td className="p-5 hidden md:table-cell text-slate-600 dark:text-slate-300">
        {location}
      </td>
      <td className="p-5 hidden lg:table-cell text-slate-600 dark:text-slate-300">
        {date}
      </td>

      <td className="p-5">
        <span className="text-xs font-semibold text-orange-600">
          {status}
        </span>
      </td>

      <td className="p-5 text-right">
        <div className="flex justify-end gap-2">
          <button className="text-primary hover:scale-110 transition">
            <span className="material-symbols-outlined">
              restore_from_trash
            </span>
          </button>
          <button className="text-red-500 hover:scale-110 transition">
            <span className="material-symbols-outlined">
              delete_forever
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}
