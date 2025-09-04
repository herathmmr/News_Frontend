import Header from "../../../../components/header";
import { Routes, Route } from "react-router-dom";
import Sport from "./sports";
import Business from "./business";
import Entertainment from "./entertainment";
import Contact from "./contac";
import About from "./about";
import ErrorNotFound from "./error";
import Home from "./home";
import Footer from "../../../../components/footer";

export default function HomePage() {
  return (
    <>
        <Header />
        <div className="h-[calc(100vh-80px)] w-full">
    <Routes path="/*">
            
            <Route path="/sports" element={<Sport/>} />
            <Route path="/Business" element={<Business/>} />
            <Route path="/Entertainment" element={<Entertainment/>} />
            <Route path="/contac" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/*" element={<ErrorNotFound/>} />
            
            
    </Routes>
    <Footer/>

        </div>

    </>
  );
}