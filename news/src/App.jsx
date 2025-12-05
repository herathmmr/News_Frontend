import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/login";
import Register from "./pages/register/register";
import HomePage from "./pages/admin/home/homePage";
import AdminPage from "./pages/admin/adminPage";
import AuthSuccess from "./pages/auth/AuthSuccess";
import './App.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
