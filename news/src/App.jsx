import AdminPage from '../components/adminPage'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<h1>home</h1>} />
        <Route path= "*" element={<h1>not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
