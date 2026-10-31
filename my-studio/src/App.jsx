import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Book from "./pages/Book";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="min-h-screen bg-[#060816] text-slate-100 antialiased">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/book" element={<Book />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}