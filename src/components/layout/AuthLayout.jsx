// src/components/layout/AuthLayout.jsx
import React from "react";

export default function AuthLayout({ children, darkMode }) {
  return (
    <div
      className={`min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}
    >
      {/* Header */}
      <header className="flex items-center justify-between h-20 w-full px-6 lg:px-12 border-b border-border-light dark:border-border-dark">
        {/* Left: Logo / App Name */}
        <h1 className="text-2xl font-bold tracking-tight">MindMirror</h1>

        {/* Right: Navbar Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="text-subtle-light dark:text-subtle-dark hover:text-text-light dark:hover:text-text-dark text-sm font-medium transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-subtle-light dark:text-subtle-dark hover:text-text-light dark:hover:text-text-dark text-sm font-medium transition-colors"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-subtle-light dark:text-subtle-dark hover:text-text-light dark:hover:text-text-dark text-sm font-medium transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-6 sm:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="flex h-20 w-full items-center justify-center border-t border-border-light dark:border-border-dark px-6 lg:px-12">
        <p className="text-subtle-light dark:text-subtle-dark text-center text-sm font-normal">
          © 2024 MindMirror. All rights reserved.{" "}
          <a href="#" className="underline-offset-2 hover:underline">
            Terms of Service
          </a>{" "}
          &{" "}
          <a href="#" className="underline-offset-2 hover:underline">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
}
