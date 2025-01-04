import React from 'react';
import ScheduleManagement from '../components/ScheduleManagement';

/**
 * Halaman Schedule untuk mengelola jadwal perawatan dengan responsivitas
 */
function Schedule() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Manajemen Perawatan
      </h1>
      <ScheduleManagement />
    </div>
  );
}

export default Schedule;
