// src/App.js

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouteList from './routes/Routes';

/**
 * Komponen utama aplikasi
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Konten Utama */}
      <div className="flex-grow container mx-auto p-6">
        <RouteList />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
