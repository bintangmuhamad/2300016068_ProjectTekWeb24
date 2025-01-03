// src/components/HavestManagement.js

import React, { useState, useEffect } from "react";

/**
 * BASE_URL untuk JSON Server.
 * Pastikan URL ini sesuai dengan lokasi di mana JSON Server berjalan.
 */
const BASE_URL = "http://localhost:5000";

function HarvestManagement() {
  const [harvests, setHarvests] = useState([]);
  const [newHarvest, setNewHarvest] = useState({ date: "", amount: "", description: "" });
  const [editHarvestId, setEditHarvestId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: "", amount: "", description: "" });

  /**
   * Mengambil data hasil panen dari JSON Server saat komponen dimuat.
   */
  useEffect(() => {
    fetch(`${BASE_URL}/harvests`)
      .then((response) => response.json())
      .then((data) => setHarvests(data))
      .catch((error) => console.error("Error fetching harvests:", error));
  }, []);

  /**
   * Menangani perubahan input pada form tambah.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHarvest((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Menambah hasil panen baru ke JSON Server.
   */
  const addHarvest = () => {
    const { date, amount, description } = newHarvest;

    if (date && amount && description) {
      fetch(`${BASE_URL}/harvests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newHarvest }),
      })
        .then((response) => response.json())
        .then((data) => {
          setHarvests((prev) => [...prev, data]);
          setNewHarvest({ date: "", amount: "", description: "" });
        })
        .catch((error) => console.error("Error adding harvest:", error));
    } else {
      alert("Harap isi semua field sebelum menambah hasil panen.");
    }
  };

  /**
   * Menghapus hasil panen dari JSON Server.
   */
  const deleteHarvest = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus hasil panen ini?")) {
      fetch(`${BASE_URL}/harvests/${id}`, { method: "DELETE" })
        .then(() => setHarvests((prev) => prev.filter((harvest) => harvest.id !== id)))
        .catch((error) => console.error("Error deleting harvest:", error));
    }
  };

  /**
   * Memulai proses edit hasil panen.
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
   * Menyimpan perubahan hasil panen ke JSON Server.
   */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { date, amount, description } = editFormData;

    if (date && amount && description) {
      fetch(`${BASE_URL}/harvests/${editHarvestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, amount, description }),
      })
        .then((response) => response.json())
        .then((updatedHarvest) => {
          setHarvests((prev) =>
            prev.map((harvest) => (harvest.id === editHarvestId ? updatedHarvest : harvest))
          );
          setEditHarvestId(null);
          setEditFormData({ date: "", amount: "", description: "" });
        })
        .catch((error) => console.error("Error updating harvest:", error));
    } else {
      alert("Harap isi semua field sebelum menyimpan perubahan.");
    }
  };

  /**
   * Membatalkan proses edit.
   */
  const handleCancelClick = () => {
    setEditHarvestId(null);
    setEditFormData({ date: "", amount: "", description: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orangeGoPalm mb-4">Manajemen Panen</h2>

      {/* Form Tambah */}
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
          className="bg-orangeGoPalm text-white py-2 px-4 rounded hover:bg-greenGoPalm"
        >
          Tambah Panen
        </button>
      </div>

      {/* Form Edit */}
      {editHarvestId && (
        <form onSubmit={handleEditFormSubmit} className="mb-6">
          <input
            type="date"
            name="date"
            value={editFormData.date}
            onChange={(e) =>
              setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            className="border border-gray-300 p-2 rounded mr-2"
          />
          <input
            type="number"
            name="amount"
            value={editFormData.amount}
            onChange={(e) =>
              setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="Jumlah (kg)"
            className="border border-gray-300 p-2 rounded mr-2"
          />
          <input
            type="text"
            name="description"
            value={editFormData.description}
            onChange={(e) =>
              setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="Deskripsi"
            className="border border-gray-300 p-2 rounded mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Batal
          </button>
        </form>
      )}

      {/* Tabel Hasil Panen */}
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tanggal</th>
            <th className="border px-4 py-2">Jumlah (kg)</th>
            <th className="border px-4 py-2">Deskripsi</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {harvests.map((harvest) => (
            <tr key={harvest.id}>
              <td className="border px-4 py-2">{harvest.date}</td>
              <td className="border px-4 py-2">{harvest.amount}</td>
              <td className="border px-4 py-2">{harvest.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditClick(harvest)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHarvest(harvest.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HarvestManagement;
