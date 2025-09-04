import AdminPage from './pages/admin/adminPage' 
import HomePage from './pages/admin/home/homePage';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Testing from '../components/testing';
import LoginPage from './pages/login/login';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/register/register';



function App() {
  

  return (
    <div className="flex flex-col min-h-screen">
    <BrowserRouter>
    <Toaster />
      <Routes path="/">
         
        <Route path="/login" element={<LoginPage/>} />
         <Route path="/register" element={<RegisterPage/>} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage/>} />
        <Route path="/testing" element={<Testing/>} />
        
      </Routes> 
    </BrowserRouter>
   
    </div>
    
  );
}

export default App;
