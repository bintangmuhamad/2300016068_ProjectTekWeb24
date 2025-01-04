import React from 'react';
import ScheduleManagement from './ScheduleManagement';

/**
 * Komponen Dashboard yang menampilkan ringkasan jadwal perawatan.
 * - Responsif dengan grid layout untuk desktop dan stack layout untuk mobile.
 */
function Dashboard() {
  return (
    <div className="p-6 bg-gradient-to-br from-orangeGoPalm to-greenGoPalm min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Dashboard GoPalm
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jadwal Perawatan */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-greenGoPalm mb-4">
            Ringkasan Jadwal Perawatan
          </h2>
          <ScheduleManagement />
        </div>

        {/* Panel Informasi Lainnya */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-greenGoPalm mb-4">
            Informasi Kebun
          </h2>
          <p>
            Selamat datang di aplikasi GoPalm! Gunakan dashboard ini untuk
            mengelola jadwal perawatan, hasil panen, dan melihat laporan
            aktivitas kebun Anda.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
