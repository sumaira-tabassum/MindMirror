import React from "react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/favicon.svg";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white px-4">
      
      {/* Top header */}
      <header className="flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
  <img src={Logo} alt="MindMirror Logo" className="w-8 h-8" />
</div>


          <span className="text-lg font-semibold">MindMirror</span>
        </div>
      </header>

      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -left-48 -top-48 w-[40rem] h-[40rem] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
        <div className="absolute -right-48 -bottom-48 w-[40rem] h-[40rem] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center z-10 text-center max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Welcome to <span className="text-primary">MindMirror</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Compare documents instantly using AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          {/* Go to Login/Signup */}
          <Button
            className="w-full min-w-[84px]"
            variant="default"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>

          {/* Use App Without Login */}
          <Button
            className="w-full min-w-[84px]"
            variant="secondary"
            onClick={() => navigate("/home")}
          >
            Try Without Login
          </Button>
        </div>
      </main>
    </div>
  );
}
