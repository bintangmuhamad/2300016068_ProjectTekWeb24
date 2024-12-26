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
    <nav className="bg-orangeGoPalm p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          GoPalm
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/schedule" className="text-white mr-4 hover:text-greenGoPalm">
                Jadwal Perawatan
              </Link>
              <Link to="/harvest" className="text-white mr-4 hover:text-greenGoPalm">
                Pengelolaan Panen
              </Link>
              <Link to="/report" className="text-white mr-4 hover:text-greenGoPalm">
                Laporan
              </Link>
              <button onClick={handleLogout} className="text-white hover:text-greenGoPalm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4 hover:text-greenGoPalm">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-greenGoPalm">
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
