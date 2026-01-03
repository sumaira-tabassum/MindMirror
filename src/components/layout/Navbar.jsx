import React from "react";

export default function Navbar({ toggleSidebar }) {
  return (
    <header
      className="
        fixed top-0 z-40 h-16 flex-shrink-0
        bg-mint-leaf-50 dark:bg-mint-leaf-950
        border-b border-mint-leaf-200 dark:border-mint-leaf-800
        p-4
        w-full md:w-[calc(100%-16rem)]   /* full width on mobile, reduced on desktop */
        md:left-64                       /* shift right by sidebar width */
        left-0
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Hamburger for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full 
                     bg-mint-leaf-200 dark:bg-mint-leaf-700 
                     text-mint-leaf-700 dark:text-mint-leaf-200"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* spacer for desktop */}
        <div className="hidden md:flex flex-1"></div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <IconButton icon="notifications" />
          <IconButton icon="help" />

          <button className="flex items-center justify-center w-10 h-10 rounded-full 
                             bg-mint-leaf-200 dark:bg-mint-leaf-700 
                             text-mint-leaf-700 dark:text-mint-leaf-200">
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
        text-mint-leaf-700 dark:text-mint-leaf-200
        hover:bg-mint-leaf-100 dark:hover:bg-mint-leaf-800
      "
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </button>
  );
}
