// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import App from "./App";
import "./index.css";

/**
 * Entry point aplikasi GoPalm.
 * Mengintegrasikan BrowserRouter untuk navigasi,
 * AuthProvider untuk autentikasi, dan App sebagai komponen utama.
 */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
