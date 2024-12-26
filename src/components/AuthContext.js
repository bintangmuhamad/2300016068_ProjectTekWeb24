// src/components/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// Membuat AuthContext
export const AuthContext = createContext();

// Komponen AuthProvider untuk membungkus aplikasi
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mengecek apakah pengguna sudah login saat komponen dimuat pertama kali
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  /**
   * Fungsi untuk mendaftar pengguna baru
   * @param {string} username - Username pengguna
   * @param {string} password - Password pengguna
   * @returns {object} - Status registrasi
   */
  const register = (username, password) => {
    // Mendapatkan data pengguna yang sudah ada dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Memeriksa apakah username sudah digunakan
    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      return { success: false, message: 'Username sudah digunakan.' };
    }

    // Menambahkan pengguna baru
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Otomatis login setelah registrasi
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  /**
   * Fungsi untuk login pengguna
   * @param {string} username - Username pengguna
   * @param {string} password - Password pengguna
   * @returns {object} - Status login
   */
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Mencari pengguna yang cocok dengan username dan password
    const matchedUser = users.find((u) => u.username === username && u.password === password);
    if (matchedUser) {
      localStorage.setItem('user', JSON.stringify(matchedUser));
      setUser(matchedUser);
      return { success: true };
    }

    return { success: false, message: 'Username atau password salah.' };
  };

  /**
   * Fungsi untuk logout pengguna
   */
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
