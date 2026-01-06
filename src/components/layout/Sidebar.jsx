import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64 h-screen flex flex-col",
          "border-r border-slate-200 dark:border-slate-800",
          "bg-white dark:bg-slate-900",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* ========================= */}
        {/* 1️⃣ TOP — FIXED HEADER     */}
        {/* ========================= */}
        <div className="p-4 flex-shrink-0 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              MindMirror
            </h1>

            {/* Close button (mobile only) */}
            <button
              className="md:hidden text-slate-700 dark:text-slate-300"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Search */}
          <label className="flex flex-col h-10 w-full">
            <div className="flex items-stretch w-full rounded-lg h-full">
              <div className="flex items-center justify-center px-3 rounded-l-lg
                              bg-slate-100 dark:bg-slate-800
                              text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined regular">search</span>
              </div>

              <input
                className="flex-1 rounded-r-lg px-3 text-sm
                           bg-slate-100 dark:bg-slate-800
                           text-slate-900 dark:text-slate-100
                           placeholder-slate-400 dark:placeholder-slate-500
                           border-none focus:ring-0"
                placeholder="Search documents..."
              />
            </div>
          </label>
        </div>

        {/* ========================= */}
        {/* 2️⃣ MIDDLE — SCROLLABLE     */}
        {/* ========================= */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <SidebarLink icon="compare_arrows" label="Compare" to="/home" />
          <SidebarLink icon="history" label="History" to="/history" />
          <SidebarLink icon="delete" label="Trash" to="/trash" />
          <SidebarLink icon="settings" label="Settings" />
          <SidebarLink icon="cloud_upload" label="Cloud Backup" />
        </div>

        {/* ========================= */}
        {/* 3️⃣ BOTTOM — FIXED FOOTER   */}
        {/* ========================= */}
        <div className="p-4 flex-shrink-0 border-t border-slate-200 dark:border-slate-800 space-y-4">

          {/* Upgrade */}
          <button
            className="
              w-full h-10 px-4 rounded-lg
              bg-slate-900 dark:bg-slate-800
              text-slate-100 dark:text-slate-100
              font-semibold
              flex items-center justify-center gap-2
              transition-transform duration-200
              hover:scale-[1.03] hover:shadow-lg
            "
          >
            <span className="material-symbols-outlined text-base">rocket_launch</span>
            Upgrade Plan
          </button>

          {/* Storage Card */}
          <div
            className="
              w-full rounded-xl p-4
              bg-slate-900 dark:bg-slate-800
              text-slate-100 dark:text-slate-100
              flex flex-col gap-3
              transition-transform duration-200
              hover:scale-[1.03] hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Storage</p>
              <span className="text-xs">30%</span>
            </div>

            <div className="rounded-full bg-slate-600 dark:bg-slate-700 h-2 overflow-hidden">
              <div
                className="h-2 bg-slate-100 dark:bg-slate-200 rounded-full"
                style={{ width: "30%" }}
              />
            </div>

            <p className="text-xs text-right text-slate-300 dark:text-slate-400">
              15.2 GB of 50 GB used
            </p>
          </div>

          {/* Logout */}
          <SidebarLink icon="logout" label="Log out" />
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ icon, label, to }) {
  if (!to) {
    return (
      <div
        className="
          flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
          text-slate-600 dark:text-slate-300
          hover:bg-slate-200 dark:hover:bg-slate-800
          cursor-not-allowed opacity-70
        "
      >
        <span className="material-symbols-outlined regular">{icon}</span>
        {label}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
        )
      }
    >
      <span className="material-symbols-outlined regular">{icon}</span>
      {label}
    </NavLink>
  );
}
