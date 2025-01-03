// src/components/Navbar.js

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

/**
 * Komponen Navbar untuk navigasi aplikasi.
 */
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Fungsi untuk logout dan mengarahkan ke halaman login.
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-orangeGoPalm to-greenGoPalm p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          GoPalm
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/schedule" className="text-white mx-2 hover:underline">
                Jadwal
              </Link>
              <Link to="/harvest" className="text-white mx-2 hover:underline">
                Panen
              </Link>
              <Link to="/report" className="text-white mx-2 hover:underline">
                Laporan
              </Link>
              <button
                onClick={handleLogout}
                className="text-white mx-2 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-white mx-2 hover:underline">
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
