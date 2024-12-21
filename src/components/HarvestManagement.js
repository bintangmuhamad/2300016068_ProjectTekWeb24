// src/components/HarvestManagement.js

import React, { useState, useEffect } from 'react';

function HarvestManagement() {
  const [harvests, setHarvests] = useState([]);
  const [newHarvest, setNewHarvest] = useState({ date: '', amount: '', description: '' });

  // Mengambil data dari localStorage saat pertama kali komponen dimuat
  useEffect(() => {
    const savedHarvests = JSON.parse(localStorage.getItem('harvests'));
    if (savedHarvests) {
      setHarvests(savedHarvests);
    }
  }, []);

  // Menangani perubahan input pada formulir
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHarvest((prev) => ({ ...prev, [name]: value }));
  };

  // Menambah hasil panen baru
  const addHarvest = () => {
    if (newHarvest.date && newHarvest.amount && newHarvest.description) {
      const updatedHarvests = [
        ...harvests,
        { ...newHarvest, id: Date.now() },
      ];
      setHarvests(updatedHarvests);
      localStorage.setItem('harvests', JSON.stringify(updatedHarvests)); // Menyimpan data ke localStorage
      setNewHarvest({ date: '', amount: '', description: '' });
    } else {
      alert('Harap isi semua field sebelum menambah hasil panen.');
    }
  };

  // Menghapus hasil panen berdasarkan ID
  const deleteHarvest = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus hasil panen ini?')) {
      const updatedHarvests = harvests.filter((harvest) => harvest.id !== id);
      setHarvests(updatedHarvests);
      localStorage.setItem('harvests', JSON.stringify(updatedHarvests)); // Menyimpan data yang sudah diperbarui
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-greenGoPalm mb-4">Manajemen Panen</h2>
      
      {/* Formulir untuk menambah hasil panen */}
      <div className="mb-6">
        <input
          type="date"
          name="date"
          value={newHarvest.date}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="number"
          name="amount"
          value={newHarvest.amount}
          onChange={handleInputChange}
          placeholder="Jumlah (kg)"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="text"
          name="description"
          value={newHarvest.description}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={addHarvest}
          className="bg-orangeGoPalm text-white py-2 px-4 rounded mt-4"
        >
          Tambah Panen
        </button>
      </div>

      {/* Tabel untuk menampilkan hasil panen */}
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Tanggal</th>
            <th className="px-4 py-2 text-left">Jumlah (kg)</th>
            <th className="px-4 py-2 text-left">Deskripsi</th>
            <th className="px-4 py-2 text-left">Aksi</th>
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
                <td className="px-4 py-2">{harvest.date}</td>
                <td className="px-4 py-2">{harvest.amount}</td>
                <td className="px-4 py-2">{harvest.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteHarvest(harvest.id)}
                    className="text-red-500 hover:text-red-700"
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
