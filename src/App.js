// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Harvest from './pages/Harvest';
import Report from './pages/ReportPage'; // Pastikan nama file sesuai

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/harvest" element={<Harvest />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
