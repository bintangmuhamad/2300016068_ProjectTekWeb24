// src/routes/Routes.js

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Schedule from '../pages/Schedule';
import Harvest from '../pages/Harvest';
import ReportPage from '../pages/ReportPage';
import About from '../pages/About'; // Import halaman About
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * Komponen RouteList untuk mengatur semua rute aplikasi
 */
function RouteList() {
  return (
    <Routes>
      {/* Rute untuk autentikasi */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rute halaman Tentang Aplikasi */}
      <Route path="/about" element={<About />} />

      {/* Rute yang dilindungi */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/schedule" 
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/harvest" 
        element={
          <ProtectedRoute>
            <Harvest />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/report" 
        element={
          <ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>
        } 
      />

      {/* Rute catch-all untuk mengarahkan ke home jika path tidak dikenal */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default RouteList;
