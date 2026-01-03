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
    // Example: if email/password are non-empty, login success
    if (loginEmail && loginPassword) {
      navigate("/home");
    } else {
      alert("Please enter valid email and password");
    }
  };

  const handleSignup = () => {
    // Basic validation
    if (!signupName || !signupEmail || !signupPassword) {
      alert("Please fill all fields");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Successful signup
    setSignupSuccess(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-border-light dark:border-border-dark p-8 space-y-8">

        {/* Toggle Login/SignUp */}
        {!signupSuccess && (
          <div className="flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-full transition-colors ${
                isLogin ? "bg-white dark:bg-gray-900" : "text-subtle-light dark:text-subtle-dark hover:bg-gray-200 dark:hover:bg-gray-700/50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-colors ${
                !isLogin ? "bg-white dark:bg-gray-900" : "text-subtle-light dark:text-subtle-dark hover:bg-gray-200 dark:hover:bg-gray-700/50"
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
                  className="w-full h-12 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Login
                </button>
                <p className="text-xs text-subtle-light dark:text-subtle-dark">
                  Don't have an account?{" "}
                  <span
                    className="text-primary cursor-pointer font-semibold"
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
                  className="w-full h-12 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </button>
                <p className="text-xs text-subtle-light dark:text-subtle-dark">
                  Already have an account?{" "}
                  <span
                    className="text-primary cursor-pointer font-semibold"
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
                className="w-full h-12 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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
      <div className="flex items-center border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-gray-800 focus-within:ring-2 focus-within:ring-primary/50">
        <input
          type={showToggle && show ? "text" : type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-text-light dark:text-text-dark px-4 py-2 h-12 text-base font-normal placeholder:text-subtle-light dark:placeholder:text-subtle-dark focus:outline-0"
        />
        {showToggle && (
          <div
            className="flex items-center justify-center pr-4 cursor-pointer text-subtle-light dark:text-subtle-dark"
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
