// src/components/Footer.js

import React from "react";

/**
 * Komponen Footer untuk menampilkan informasi hak cipta.
 */
function Footer() {
  return (
    <footer className="bg-greenGoPalm text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} GoPalm. Semua hak cipta dilindungi.</p>
    </footer>
  );
}

export default Footer;
