import { useState } from "react";
import Header from "../../../../components/header";
import { Routes, Route } from "react-router-dom";
import Sport from "./sports";
import Business from "./business";
import Entertainment from "./entertainment";
import Politics from "./politics";
import Technology from "./technology";
import Contact from "./contac";
import About from "./about";
import ErrorNotFound from "./error";
import Home from "./home";
import Footer from "../../../../components/footer";
import NewsOver from "./newsOverview";
import GovernmentJobs from "./governmentJobs";
import PrivateJobs from "./privateJobs";
import JobOverview from "./jobOverview";
import SaveList from "./saveList";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <Header />
      
      <main className="flex-1 w-full pt-0">
        <Routes>
          <Route path="/sports" element={<Sport />} />
          <Route path="/business" element={<Business />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/contac" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newsov/:id" element={<NewsOver />} />
          <Route path="/jobs/government" element={<GovernmentJobs />} />
          <Route path="/jobs/private" element={<PrivateJobs />} />
          <Route path="/jobs/:id" element={<JobOverview />} />
          <Route path="/my-saves" element={<SaveList />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}