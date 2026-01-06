// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  // Mock functions for demo (replace with real backend logic)
  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      navigate("/home");
    } else {
      alert("Please enter valid email and password");
    }
  };

  const handleSignup = () => {
    if (!signupName || !signupEmail || !signupPassword) {
      alert("Please fill all fields");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setSignupSuccess(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-300 dark:border-slate-700 p-8 space-y-8">

        {/* Toggle Login/SignUp */}
        {!signupSuccess && (
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-full transition-colors ${
                isLogin ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-colors ${
                !isLogin ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {isLogin && !signupSuccess && (
            <>
              <Input label="Email" value={loginEmail} setValue={setLoginEmail} type="email" placeholder="Enter your email" />
              <Input label="Password" value={loginPassword} setValue={setLoginPassword} type="password" placeholder="Enter your password" showToggle />
              
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={handleLogin}
                  className="w-full h-12 bg-slate-700 dark:bg-slate-800 text-slate-100 rounded-lg hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors"
                >
                  Login
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Don't have an account?{" "}
                  <span
                    className="text-slate-700 dark:text-slate-300 cursor-pointer font-semibold"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          )}

          {!isLogin && !signupSuccess && (
            <>
              <Input label="Full Name" value={signupName} setValue={setSignupName} type="text" placeholder="Enter your full name" />
              <Input label="Email" value={signupEmail} setValue={setSignupEmail} type="email" placeholder="Enter your email" />
              <Input label="Password" value={signupPassword} setValue={setSignupPassword} type="password" placeholder="Enter password" showToggle />
              <Input label="Confirm Password" value={signupConfirmPassword} setValue={setSignupConfirmPassword} type="password" placeholder="Confirm password" showToggle />
              
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={handleSignup}
                  className="w-full h-12 bg-slate-700 dark:bg-slate-800 text-slate-100 rounded-lg hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors"
                >
                  Sign Up
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <span
                    className="text-slate-700 dark:text-slate-300 cursor-pointer font-semibold"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </p>
              </div>
            </>
          )}

          {/* After successful signup */}
          {signupSuccess && (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-semibold">Signed up successfully!</p>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setSignupSuccess(false);
                }}
                className="w-full h-12 bg-slate-700 dark:bg-slate-800 text-slate-100 rounded-lg hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Reusable Input Component
function Input({ label, value, setValue, type = "text", placeholder, showToggle }) {
  const [show, setShow] = useState(false);

  return (
    <label className="flex flex-col">
      <p className="text-sm font-medium pb-2">{label}</p>
      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-slate-500/50">
        <input
          type={showToggle && show ? "text" : type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 px-4 py-2 h-12 text-base font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-0"
        />
        {showToggle && (
          <div
            className="flex items-center justify-center pr-4 cursor-pointer text-slate-500 dark:text-slate-400"
            onClick={() => setShow(!show)}
          >
            <span className="material-symbols-outlined text-xl">
              {show ? "visibility" : "visibility_off"}
            </span>
          </div>
        )}
      </div>
    </label>
  );
}
