import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Results from "./pages/Result";
import History from "./pages/History";
import Trash from "./pages/Trash";

import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";

function App() {
  // Global dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Update HTML class and localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome page standalone */}
        <Route
          path="/"
          element={<Welcome darkMode={darkMode} />}
        />

        {/* Login page wrapped in AuthLayout */}
        <Route
          path="/login"
          element={
            <AuthLayout darkMode={darkMode}>
              <Login />
            </AuthLayout>
          }
        />

        {/* Pages with navbar/sidebar */}
        <Route
          path="/home"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <History />
            </Layout>
          }
        />
        <Route
          path="/trash"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Trash />
            </Layout>
          }
        />
        <Route
          path="/results"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Results />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
