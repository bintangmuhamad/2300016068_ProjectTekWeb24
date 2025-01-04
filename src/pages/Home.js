import React from 'react';
import Dashboard from '../components/Dashboard';

/**
 * Halaman Home yang menampilkan Dashboard.
 * - Menyediakan struktur yang responsif.
 */
function Home() {
  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-b from-greenGoPalm to-orangeGoPalm min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Beranda</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Dashboard />
      </div>
    </div>
  );
}

export default Home;
