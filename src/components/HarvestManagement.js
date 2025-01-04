import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Komponen HarvestManagement untuk mengelola hasil panen.
 * - Responsif untuk berbagai ukuran layar dengan tabel adaptif.
 * - Fitur CRUD: Tambah, Hapus, dan Edit Hasil Panen.
 */
function HarvestManagement() {
  const [harvests, setHarvests] = useState([]);
  const [newHarvest, setNewHarvest] = useState({ date: '', amount: '', description: '' });
  const [editHarvestId, setEditHarvestId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: '', amount: '', description: '' });

  // Fetch data dari server saat komponen dimuat
  useEffect(() => {
    axios.get('http://localhost:5000/harvests').then((response) => {
      setHarvests(response.data);
    });
  }, []);

  // Handler perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHarvest((prev) => ({ ...prev, [name]: value }));
  };

  // Tambah hasil panen baru
  const addHarvest = () => {
    if (newHarvest.date && newHarvest.amount && newHarvest.description) {
      axios.post('http://localhost:5000/harvests', newHarvest).then((response) => {
        setHarvests([...harvests, response.data]);
        setNewHarvest({ date: '', amount: '', description: '' });
      });
    } else {
      alert('Harap isi semua field sebelum menambah hasil panen.');
    }
  };

  // Hapus hasil panen berdasarkan ID
  const deleteHarvest = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus hasil panen ini?')) {
      axios.delete(`http://localhost:5000/harvests/${id}`).then(() => {
        setHarvests(harvests.filter((harvest) => harvest.id !== id));
      });
    }
  };

  // Edit hasil panen
  const handleEditClick = (harvest) => {
    setEditHarvestId(harvest.id);
    setEditFormData({
      date: harvest.date,
      amount: harvest.amount,
      description: harvest.description,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/harvests/${editHarvestId}`, editFormData).then(() => {
      setHarvests(
        harvests.map((harvest) =>
          harvest.id === editHarvestId ? { ...harvest, ...editFormData } : harvest
        )
      );
      setEditHarvestId(null);
      setEditFormData({ date: '', amount: '', description: '' });
    });
  };

  const handleCancelClick = () => {
    setEditHarvestId(null);
    setEditFormData({ date: '', amount: '', description: '' });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-greenGoPalm mb-4">Manajemen Panen</h2>

      {/* Form Tambah Hasil Panen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          name="date"
          value={newHarvest.date}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="number"
          name="amount"
          value={newHarvest.amount}
          onChange={handleInputChange}
          placeholder="Jumlah (kg)"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="description"
          value={newHarvest.description}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={addHarvest}
          className="bg-greenGoPalm text-white py-2 px-4 rounded w-full md:col-span-1 hover:bg-orangeGoPalm transition duration-300"
        >
          Tambah Panen
        </button>
      </div>

      {/* Form Edit Hasil Panen */}
      {editHarvestId && (
        <form onSubmit={handleEditFormSubmit} className="mb-6 bg-gray-100 p-4 rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="date"
              name="date"
              value={editFormData.date}
              onChange={handleEditFormChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              name="amount"
              value={editFormData.amount}
              onChange={handleEditFormChange}
              placeholder="Jumlah (kg)"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              placeholder="Deskripsi"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
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
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Tanggal</th>
              <th className="px-4 py-2 border-b">Jumlah (kg)</th>
              <th className="px-4 py-2 border-b">Deskripsi</th>
              <th className="px-4 py-2 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {harvests.map((harvest) => (
              <tr key={harvest.id}>
                <td className="px-4 py-2 border-b">{harvest.date}</td>
                <td className="px-4 py-2 border-b">{harvest.amount}</td>
                <td className="px-4 py-2 border-b">{harvest.description}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEditClick(harvest)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHarvest(harvest.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HarvestManagement;
