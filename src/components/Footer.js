import React from 'react';

function Footer() {
  return (
    <footer className="bg-greenGoPalm text-white py-4">
      <div className="container mx-auto text-center text-sm lg:text-base">
        <p>&copy; {new Date().getFullYear()} GoPalm. Semua hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}

export default Footer;
