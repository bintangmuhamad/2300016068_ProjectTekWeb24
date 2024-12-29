// src/components/Dashboard.js

import React from 'react';
import ScheduleManagement from './ScheduleManagement';

/**
 * Komponen Dashboard yang menampilkan ringkasan jadwal perawatan
 * serta integrasi dari ScheduleManagement.js
 */
function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-orangeGoPalm mb-6">Dashboard</h2>
      <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
        <h3 className="text-xl text-greenGoPalm mb-2">Ringkasan Jadwal Perawatan</h3>
        <ScheduleManagement />
      </div>
      {/* Target menambahkan ringkasan atau komponen lain di sini */}
    </div>
  );
}

export default Dashboard;
