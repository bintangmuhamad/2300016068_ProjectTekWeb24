import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-greenGoPalm p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          GoPalm
        </Link>
        <div>
          <Link to="/schedule" className="text-white mr-4 hover:text-orangeGoPalm">
            Jadwal Perawatan
          </Link>
          <Link to="/harvest" className="text-white hover:text-orangeGoPalm">
            Pengelolaan Panen
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
