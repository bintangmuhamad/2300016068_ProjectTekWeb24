// src/pages/About.js

import React from "react";

/**
 * Halaman Tentang Aplikasi
 * Berisi informasi terkait aplikasi GoPalm, termasuk fungsi utama, tujuan, teknologi, dan tim pengembang.
 */
function About() {
  return (
    <div className="p-6 bg-gradient-to-r from-greenGoPalm to-orangeGoPalm text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Tentang Aplikasi GoPalm</h1>
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Apa itu GoPalm?</h2>
        <p className="mb-4">
          <strong>GoPalm</strong> adalah aplikasi berbasis web yang dirancang untuk membantu petani kelapa sawit 
          dalam mengelola jadwal perawatan kebun, mencatat hasil panen, dan menghasilkan laporan 
          aktivitas dengan mudah. Aplikasi ini bertujuan untuk meningkatkan efisiensi pengelolaan kebun sawit 
          dengan memanfaatkan teknologi modern.
        </p>

        <h2 className="text-2xl font-bold mb-4">Fungsi Utama</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Pengelolaan jadwal perawatan kebun sawit (CRUD).</li>
          <li>Pencatatan hasil panen kebun secara terstruktur.</li>
          <li>Pembuatan laporan aktivitas kebun dalam format yang mudah dibaca.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Tujuan Aplikasi</h2>
        <p className="mb-4">
          Aplikasi ini bertujuan untuk membantu petani kelapa sawit:
          <ul className="list-disc pl-6">
            <li>Meningkatkan produktivitas melalui pengelolaan yang terorganisasi.</li>
            <li>Menghemat waktu dalam mencatat aktivitas kebun.</li>
            <li>Memanfaatkan teknologi untuk kemajuan pertanian modern.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">Teknologi yang Digunakan</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>React.js: Untuk pengembangan antarmuka pengguna.</li>
          <li>Axios: Untuk komunikasi dengan server.</li>
          <li>JSON Server: Untuk simulasi backend dan penyimpanan data.</li>
          <li>TailwindCSS: Untuk styling aplikasi yang responsif dan modern.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Tim Pengembang</h2>
        <ul className="list-disc pl-6">
          <li><strong>Nama:</strong> Muhammad Bintang</li>
          <li><strong>Peran:</strong> Pengembang Frontend</li>
          <li><strong>Keterangan:</strong> Mengembangkan aplikasi ini sebagai proyek akhir untuk penilaian mata kuliah Teknologi Web.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
