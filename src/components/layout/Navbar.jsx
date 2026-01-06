import React from "react";

export default function Navbar({ toggleSidebar, darkMode, setDarkMode }) {
  return (
    <header
      className="
        fixed top-0 z-40 h-16 flex-shrink-0
        bg-slate-50 dark:bg-slate-900
        border-b border-slate-200 dark:border-slate-700
        p-4
        w-full md:w-[calc(100%-16rem)]
        md:left-64
        left-0
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Hamburger for mobile */}
        <button
          onClick={toggleSidebar}
          className="
            md:hidden flex items-center justify-center w-10 h-10 rounded-full
            bg-slate-100 dark:bg-slate-800
            text-slate-700 dark:text-slate-200
          "
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Spacer */}
        <div className="hidden md:flex flex-1"></div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            title="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>


          <IconButton icon="notifications" />
          <IconButton icon="help" />

          <button
            className="
              flex items-center justify-center w-10 h-10 rounded-full
              bg-slate-100 dark:bg-slate-800
              text-slate-700 dark:text-slate-200
            "
          >
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function IconButton({ icon }) {
  return (
    <button
      className="
        flex items-center justify-center w-8 h-8 rounded-full
        text-slate-700 dark:text-slate-200
        hover:bg-slate-200 dark:hover:bg-slate-700
      "
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </button>
  );
}
