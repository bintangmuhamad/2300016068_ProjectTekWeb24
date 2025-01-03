// src/components/AuthContext.js

import React, { createContext, useState, useEffect } from "react";

// Membuat AuthContext
export const AuthContext = createContext();

/**
 * AuthProvider adalah provider untuk mengelola autentikasi pengguna.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mengambil data pengguna dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  /**
   * Fungsi untuk mendaftar pengguna baru.
   * @param {string} username - Username pengguna.
   * @param {string} password - Password pengguna.
   * @returns {object} - Status registrasi.
   */
  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username)) {
      return { success: false, message: "Username sudah digunakan." };
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  /**
   * Fungsi untuk login pengguna.
   * @param {string} username - Username pengguna.
   * @param {string} password - Password pengguna.
   * @returns {object} - Status login.
   */
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (matchedUser) {
      localStorage.setItem("user", JSON.stringify(matchedUser));
      setUser(matchedUser);
      return { success: true };
    }
    return { success: false, message: "Username atau password salah." };
  };

  /**
   * Fungsi untuk logout pengguna.
   */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
