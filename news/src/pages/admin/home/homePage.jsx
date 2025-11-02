import { useState } from "react";
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
import NewsOver from "./newsOverview";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <Header />
      
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/sports" element={<Sport />} />
          <Route path="/business" element={<Business />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/contac" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newsov/:id" element={<NewsOver />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}