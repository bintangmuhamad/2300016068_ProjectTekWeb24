// src/components/ProtectedRoute.js

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

/**
 * Komponen ProtectedRoute untuk melindungi rute tertentu.
 */
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Jika pengguna belum login, redirect ke halaman login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika pengguna sudah login, tampilkan konten yang diminta.
  return children;
}

export default ProtectedRoute;
