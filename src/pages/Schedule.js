// src/pages/Schedule.js

import React from "react";
import ScheduleManagement from "../components/ScheduleManagement";

/**
 * Halaman Schedule untuk mengelola jadwal perawatan.
 */
function Schedule() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-orangeGoPalm mb-4">
        Manajemen Perawatan
      </h1>
      <ScheduleManagement />
    </div>
  );
}

export default Schedule;
