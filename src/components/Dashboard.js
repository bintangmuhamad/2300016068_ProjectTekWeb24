// src/components/Dashboard.js

import React from "react";
import ScheduleManagement from "./ScheduleManagement";

/**
 * Komponen Dashboard untuk menampilkan ringkasan jadwal perawatan.
 */
function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-orangeGoPalm mb-6">Dashboard</h2>
      <div className="bg-gradient-to-r from-orangeGoPalm to-greenGoPalm p-4 shadow-lg rounded-lg mb-6">
        <h3 className="text-xl text-white mb-2">Ringkasan Jadwal Perawatan</h3>
        <ScheduleManagement />
      </div>
    </div>
  );
}

export default Dashboard;
