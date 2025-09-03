import AdminPage from './pages/admin/adminPage' 
import HomePage from './pages/admin/home/homePage';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
