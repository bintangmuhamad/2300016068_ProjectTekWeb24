import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-greenGoPalm mb-6">Dashboard</h2>
      <div className="bg-white p-4 shadow-lg rounded-lg mb-4">
        <h3 className="text-xl text-orangeGoPalm">Ringkasan Jadwal Perawatan</h3>
        <p>Ringkasan jadwal perawatan yang akan datang.</p>
      </div>
      <Link to="/schedule" className="bg-greenGoPalm text-white py-2 px-4 rounded-full hover:bg-orangeGoPalm">
        Ke Manajemen Perawatan
      </Link>
    </div>
  );
}

export default Dashboard;
