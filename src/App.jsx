import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Results from "./pages/Result"; 
import History from "./pages/History"; 
import Trash from "./pages/Trash";

import Layout from "./components/layout/Layout"; 
import AuthLayout from "./components/layout/AuthLayout"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome page can be standalone */}
        <Route path="/" element={<Welcome />} />

        {/* Login page wrapped in AuthLayout */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />

        {/* Home page wrapped in main Layout */}
        <Route path="/home" element={<Layout><Home /></Layout>} />

        <Route path="/history" element={<Layout><History /></Layout>} />

        <Route path="/trash" element={<Layout><Trash /></Layout>} />

        {/* Results page wrapped in main Layout */}
        <Route path="/results" element={<Layout><Results /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

// import { BrowserRouter } from "react-router-dom";
// import Layout from "./components/layout/Layout";
// import Trash from "./pages/Trash";

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Trash />
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;

