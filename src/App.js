// src/App.js

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteList from "./routes/Routes";

/**
 * Komponen utama aplikasi GoPalm.
 * Mengelola layout aplikasi dengan Navbar, Footer, dan konten utama (RouteList).
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-greenGoPalm to-orangeGoPalm">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <div className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <RouteList />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
