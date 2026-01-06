import React from "react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import LogoLight from "@/assets/LogoLight.svg";
import LogoDark from "@/assets/LogoDark.svg";  

export default function Welcome({ darkMode }) {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white px-4">

      {/* Top header
      <div className="flex items-center justify-center gap-3">
         <img src={Icon} alt="MindMirror Icon" className="h-8 md:h-8" />
        <span className="text-4xl md:text-3xl font-bold text-gray-900 dark:text-white">
          MindMirror
        </span>
      </div> */}

      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -left-48 -top-48 w-[40rem] h-[40rem] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
        <div className="absolute -right-48 -bottom-48 w-[40rem] h-[40rem] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
      </div>

      {/* Main content */}
       
      <main className="flex flex-1 flex-col items-center justify-center z-10 text-center max-w-xl mx-auto">
       <img
  src={darkMode ? LogoLight : LogoDark}
  alt="MindMirror Icon"
  className="h-20 md:h-40 mb-6"
/>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Welcome to <span className="text-primary">MindMirror</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Compare documents instantly using AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Button
            className="w-full min-w-[84px]"
            variant="default"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>

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
