import Header from "../../../../components/header";
import { Routes, Route } from "react-router-dom";

export default function HomePage() {
  return (
    <>
        <Header />
        <div className="h-[calc(100vh-80px)] w-full bg-red-400">
    <Routes path="/*">
            
            <Route path="/sports" element={<h1>sport</h1>} />
            <Route path="/Business" element={<h1>Business</h1>} />
            <Route path="/Entertainment" element={<h1>Entertainment</h1>} />
            <Route path="/contac" element={<h1>contact</h1>} />
            <Route path="/contac" element={<h1>contact</h1>} />
            <Route path="/about" element={<h1>about</h1>} />
            
            
    </Routes>

        </div>

    </>
  );
}