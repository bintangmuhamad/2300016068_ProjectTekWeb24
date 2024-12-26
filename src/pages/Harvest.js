// src/pages/Harvest.js

import React from 'react';
import HarvestManagement from '../components/HarvestManagement';

/**
 * Halaman Harvest untuk mengelola hasil panen
 */
function Harvest() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-orangeGoPalm mb-4">Manajemen Panen</h1>
      <HarvestManagement />
    </div>
  );
}

export default Harvest;
