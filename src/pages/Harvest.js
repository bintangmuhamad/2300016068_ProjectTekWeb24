import React from 'react';
import HarvestManagement from '../components/HarvestManagement';

/**
 * Halaman Harvest untuk mengelola hasil panen dengan responsivitas
 */
function Harvest() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Manajemen Panen
      </h1>
      <HarvestManagement />
    </div>
  );
}

export default Harvest;
