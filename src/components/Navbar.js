// src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

/**
 * Komponen Navbar untuk navigasi antar halaman
 * Menampilkan tautan berbeda berdasarkan status autentikasi
 */
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Fungsi untuk menangani logout pengguna
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-greenGoPalm to-orangeGoPalm p-4 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        {/* Nama Aplikasi */}
        <Link to="/" className="text-white font-bold text-xl">
          GoPalm
        </Link>

        {/* Navigasi */}
        <div>
          <Link to="/" className="text-white mx-2 hover:text-gray-300">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/schedule" className="text-white mx-2 hover:text-gray-300">
                Jadwal Perawatan
              </Link>
              <Link to="/harvest" className="text-white mx-2 hover:text-gray-300">
                Pengelolaan Panen
              </Link>
              <Link to="/report" className="text-white mx-2 hover:text-gray-300">
                Laporan
              </Link>
              <Link to="/about" className="text-white mx-2 hover:text-gray-300">
                Tentang Aplikasi
              </Link>
              <button
                onClick={handleLogout}
                className="text-white mx-2 hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2 hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="text-white mx-2 hover:text-gray-300">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
