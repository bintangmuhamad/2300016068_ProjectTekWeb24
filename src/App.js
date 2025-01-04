import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouteList from './routes/Routes';

/**
 * Komponen utama aplikasi dengan responsivitas
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-orange-green">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <RouteList />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
