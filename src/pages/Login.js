import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Halaman Login untuk autentikasi pengguna.
 */
function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const result = login(username, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-greenGoPalm to-orangeGoPalm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-greenGoPalm text-center mb-6">Login</h2>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-greenGoPalm text-white py-2 px-4 rounded hover:bg-orangeGoPalm transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="text-orangeGoPalm hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
