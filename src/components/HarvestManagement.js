// src/components/HarvestManagement.js

import React, { useState, useEffect } from 'react';
import data from '../data/data';

/**
 * Komponen HarvestManagement untuk mengelola hasil panen
 * Fitur: Tambah, Hapus, dan Edit Hasil Panen
 */
function HarvestManagement() {
  const [harvests, setHarvests] = useState([]);
  const [newHarvest, setNewHarvest] = useState({ date: '', amount: '', description: '' });
  const [editHarvestId, setEditHarvestId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: '', amount: '', description: '' });

  // Mengambil data dari localStorage atau menggunakan data default saat komponen dimuat
  useEffect(() => {
    const savedHarvests = JSON.parse(localStorage.getItem('harvests'));
    if (savedHarvests) {
      setHarvests(savedHarvests);
    } else {
      setHarvests(data.harvests);
      localStorage.setItem('harvests', JSON.stringify(data.harvests));
    }
  }, []);

  /**
   * Menangani perubahan input pada formulir tambah hasil panen
   * @param {object} e - Event perubahan input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHarvest((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Menambah hasil panen baru
   */
  const addHarvest = () => {
    const { date, amount, description } = newHarvest;
    if (date && amount && description) {
      const updatedHarvests = [
        ...harvests,
        { ...newHarvest, id: Date.now() },
      ];
      setHarvests(updatedHarvests);
      localStorage.setItem('harvests', JSON.stringify(updatedHarvests)); // Menyimpan ke localStorage
      setNewHarvest({ date: '', amount: '', description: '' }); // Reset form
    } else {
      alert('Harap isi semua field sebelum menambah hasil panen.');
    }
  };

  /**
   * Menghapus hasil panen berdasarkan ID
   * @param {number} id - ID hasil panen yang akan dihapus
   */
  const deleteHarvest = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus hasil panen ini?')) {
      const updatedHarvests = harvests.filter((harvest) => harvest.id !== id);
      setHarvests(updatedHarvests);
      localStorage.setItem('harvests', JSON.stringify(updatedHarvests)); // Menyimpan perubahan ke localStorage
    }
  };

  /**
   * Memulai proses edit hasil panen
   * @param {object} harvest - Objek hasil panen yang akan diedit
   */
  const handleEditClick = (harvest) => {
    setEditHarvestId(harvest.id);
    setEditFormData({
      date: harvest.date,
      amount: harvest.amount,
      description: harvest.description,
    });
  };

  /**
   * Menangani perubahan input pada formulir edit hasil panen
   * @param {object} e - Event perubahan input
   */
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Menyimpan perubahan hasil panen yang diedit
   * @param {object} e - Event submit form
   */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { date, amount, description } = editFormData;

    if (date && amount && description) {
      const updatedHarvests = harvests.map((harvest) => {
        if (harvest.id === editHarvestId) {
          return {
            ...harvest,
            date,
            amount,
            description,
          };
        }
        return harvest;
      });
      setHarvests(updatedHarvests);
      localStorage.setItem('harvests', JSON.stringify(updatedHarvests)); // Menyimpan perubahan ke localStorage
      setEditHarvestId(null);
      setEditFormData({ date: '', amount: '', description: '' }); // Reset form edit
    } else {
      alert('Harap isi semua field sebelum menyimpan perubahan.');
    }
  };

  /**
   * Membatalkan proses edit hasil panen
   */
  const handleCancelClick = () => {
    setEditHarvestId(null);
    setEditFormData({ date: '', amount: '', description: '' });
  };

  return (
    <div className="p-6">
      {/* Formulir Tambah Hasil Panen */}
      <h3 className="text-xl font-semibold text-greenGoPalm mb-4">Tambah Hasil Panen</h3>
      <div className="flex flex-wrap mb-6">
        <input
          type="date"
          name="date"
          value={newHarvest.date}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded mr-2 mb-2"
          required
        />
        <input
          type="number"
          name="amount"
          value={newHarvest.amount}
          onChange={handleInputChange}
          placeholder="Jumlah (kg)"
          className="border border-gray-300 p-2 rounded mr-2 mb-2"
          required
        />
        <input
          type="text"
          name="description"
          value={newHarvest.description}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="border border-gray-300 p-2 rounded mr-2 mb-2"
          required
        />
        <button
          onClick={addHarvest}
          className="bg-orangeGoPalm text-white py-2 px-4 rounded-full hover:bg-greenGoPalm transition duration-300"
        >
          Tambah Panen
        </button>
      </div>

      {/* Formulir Edit Hasil Panen */}
      {editHarvestId && (
        <form onSubmit={handleEditFormSubmit} className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4 text-greenGoPalm">Edit Hasil Panen</h3>
          <div className="flex flex-wrap mb-4">
            <input
              type="date"
              name="date"
              value={editFormData.date}
              onChange={handleEditFormChange}
              className="border border-gray-300 p-2 rounded mr-2 mb-2"
              required
            />
            <input
              type="number"
              name="amount"
              value={editFormData.amount}
              onChange={handleEditFormChange}
              placeholder="Jumlah (kg)"
              className="border border-gray-300 p-2 rounded mr-2 mb-2"
              required
            />
            <input
              type="text"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              placeholder="Deskripsi"
              className="border border-gray-300 p-2 rounded mr-2 mb-2"
              required
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 transition duration-300"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Tabel Hasil Panen */}
      <h3 className="text-xl font-semibold text-greenGoPalm mb-4">Daftar Hasil Panen</h3>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Tanggal</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Jumlah (kg)</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Deskripsi</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {harvests.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">Tidak ada hasil panen.</td>
            </tr>
          ) : (
            harvests.map((harvest) => (
              <tr key={harvest.id}>
                <td className="px-4 py-2 border-b border-gray-200">{harvest.date}</td>
                <td className="px-4 py-2 border-b border-gray-200">{harvest.amount}</td>
                <td className="px-4 py-2 border-b border-gray-200">{harvest.description}</td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={() => handleEditClick(harvest)}
                    className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHarvest(harvest.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HarvestManagement;
