// src/pages/Home.js

import React from "react";
import Dashboard from "../components/Dashboard";

/**
 * Halaman Home yang menampilkan Dashboard dan ringkasan fitur aplikasi.
 */
function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-greenGoPalm mb-6">
        Selamat Datang di GoPalm
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Kelola kebun sawit Anda dengan mudah menggunakan fitur manajemen jadwal
        perawatan, pengelolaan panen, dan laporan lengkap.
      </p>
      <div className="bg-gradient-to-r from-greenGoPalm to-orangeGoPalm p-6 rounded-lg shadow-lg">
        <Dashboard />
      </div>
    </div>
  );
}

export default Home;
