import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-orangeGoPalm px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-lg">
          GoPalm
        </Link>

        {/* Menu Button for Mobile */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:gap-4`}
        >
          {user ? (
            <>
              <Link
                to="/schedule"
                className="block lg:inline-block text-white hover:text-greenGoPalm"
              >
                Jadwal Perawatan
              </Link>
              <Link
                to="/harvest"
                className="block lg:inline-block text-white hover:text-greenGoPalm"
              >
                Pengelolaan Panen
              </Link>
              <Link
                to="/report"
                className="block lg:inline-block text-white hover:text-greenGoPalm"
              >
                Laporan
              </Link>
              <button
                onClick={handleLogout}
                className="block lg:inline-block text-white hover:text-greenGoPalm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block lg:inline-block text-white hover:text-greenGoPalm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block lg:inline-block text-white hover:text-greenGoPalm"
              >
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
