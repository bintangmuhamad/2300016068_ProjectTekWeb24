import React from 'react';
import Report from '../components/Report';

/**
 * Halaman ReportPage untuk menampilkan manajemen catatan.
 * - Memanfaatkan komponen Report yang telah dibuat.
 * - Menyediakan struktur responsif dan konsisten.
 */
function ReportPage() {
  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-b from-greenGoPalm to-orangeGoPalm min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Laporan</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Report />
      </div>
    </div>
  );
}

export default ReportPage;
