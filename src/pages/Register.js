// src/pages/Register.js

import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";

/**
 * Halaman Register untuk pendaftaran pengguna baru.
 */
function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    const result = register(formData.username, formData.password);
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orangeGoPalm">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-greenGoPalm mb-6 text-center">
          Daftar
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orangeGoPalm text-white py-2 px-4 rounded hover:bg-greenGoPalm transition duration-300"
          >
            Daftar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-orangeGoPalm hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
