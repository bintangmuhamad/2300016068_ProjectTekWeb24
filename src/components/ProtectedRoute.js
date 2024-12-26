// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Komponen ProtectedRoute untuk melindungi rute tertentu
 * @param {object} props - Properti komponen
 * @returns {JSX.Element} - Komponen yang diizinkan atau redirect ke login
 */
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  
  // Jika pengguna belum login, redirect ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika pengguna sudah login, tampilkan komponen yang diinginkan
  return children;
}

export default ProtectedRoute;
