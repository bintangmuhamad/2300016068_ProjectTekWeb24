// src/components/ScheduleManagement.js

import React, { useState, useEffect } from 'react';

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ date: '', type: '', description: '' });
  const [editScheduleId, setEditScheduleId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: '', type: '', description: '' });

  // Mengambil data dari localStorage saat pertama kali komponen dimuat
  useEffect(() => {
    const savedSchedules = JSON.parse(localStorage.getItem('schedules'));
    if (savedSchedules) {
      setSchedules(savedSchedules);
    }
  }, []);

  // Menangani perubahan input pada formulir tambah jadwal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  // Menambah jadwal baru
  const addSchedule = () => {
    if (newSchedule.date && newSchedule.type && newSchedule.description) {
      const updatedSchedules = [
        ...schedules,
        { ...newSchedule, id: Date.now(), status: 'Belum Dilaksanakan' },
      ];
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan data ke localStorage
      setNewSchedule({ date: '', type: '', description: '' });
    } else {
      alert('Harap isi semua field sebelum menambah jadwal.');
    }
  };

  // Menghapus jadwal berdasarkan ID
  const deleteSchedule = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan data yang sudah diperbarui
    }
  };

  // Mengubah status jadwal berdasarkan ID
  const toggleStatus = (id) => {
    const updatedSchedules = schedules.map((schedule) => {
      if (schedule.id === id) {
        return {
          ...schedule,
          status: schedule.status === 'Belum Dilaksanakan' ? 'Sudah Dilaksanakan' : 'Belum Dilaksanakan',
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan data yang sudah diperbarui
  };

  // Memulai proses edit jadwal
  const handleEditClick = (schedule) => {
    setEditScheduleId(schedule.id);
    setEditFormData({
      date: schedule.date,
      type: schedule.type,
      description: schedule.description,
    });
  };

  // Menangani perubahan input pada formulir edit jadwal
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Menyimpan perubahan jadwal
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    if (editFormData.date && editFormData.type && editFormData.description) {
      const updatedSchedules = schedules.map((schedule) => {
        if (schedule.id === editScheduleId) {
          return {
            ...schedule,
            date: editFormData.date,
            type: editFormData.type,
            description: editFormData.description,
          };
        }
        return schedule;
      });
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan data yang sudah diperbarui
      setEditScheduleId(null);
      setEditFormData({ date: '', type: '', description: '' });
    } else {
      alert('Harap isi semua field sebelum menyimpan perubahan.');
    }
  };

  // Membatalkan proses edit
  const handleCancelClick = () => {
    setEditScheduleId(null);
    setEditFormData({ date: '', type: '', description: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-greenGoPalm mb-6">Manajemen Perawatan</h2>
      
      {/* Formulir untuk menambah jadwal perawatan */}
      <div className="mb-6">
        <input
          type="date"
          name="date"
          value={newSchedule.date}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="text"
          name="type"
          value={newSchedule.type}
          onChange={handleInputChange}
          placeholder="Jenis Perawatan"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="text"
          name="description"
          value={newSchedule.description}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={addSchedule}
          className="bg-greenGoPalm text-white py-2 px-4 rounded-full hover:bg-orangeGoPalm"
        >
          Tambah Jadwal
        </button>
      </div>

      {/* Formulir edit jadwal perawatan */}
      {editScheduleId && (
        <form onSubmit={handleEditFormSubmit} className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">Edit Jadwal</h3>
          <div className="flex flex-wrap">
            <input
              type="date"
              name="date"
              value={editFormData.date}
              onChange={handleEditFormChange}
              className="border border-gray-300 p-2 rounded mr-2 mb-2"
            />
            <input
              type="text"
              name="type"
              value={editFormData.type}
              onChange={handleEditFormChange}
              placeholder="Jenis Perawatan"
              className="border border-gray-300 p-2 rounded mr-2 mb-2"
            />
            <input
              type="text"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              placeholder="Deskripsi"
              className="border border-gray-300 p-2 rounded mr-2 mb-2"
            />
            <div className="flex items-center mb-2">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
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
            </div>
          </div>
        </form>
      )}

      {/* Tabel untuk menampilkan jadwal perawatan */}
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Tanggal</th>
            <th className="px-4 py-2 text-left">Jenis</th>
            <th className="px-4 py-2 text-left">Deskripsi</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">Tidak ada jadwal perawatan.</td>
            </tr>
          ) : (
            schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="border px-4 py-2">{schedule.date}</td>
                <td className="border px-4 py-2">{schedule.type}</td>
                <td className="border px-4 py-2">{schedule.description}</td>
                <td className={`border px-4 py-2 ${schedule.status === 'Sudah Dilaksanakan' ? 'text-green-600' : 'text-red-600'}`}>
                  {schedule.status}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => toggleStatus(schedule.id)}
                    className={`mr-2 ${schedule.status === 'Belum Dilaksanakan' ? 'bg-yellow-500' : 'bg-green-500'} text-white py-1 px-2 rounded hover:opacity-75`}
                  >
                    {schedule.status === 'Belum Dilaksanakan' ? 'Mark as Done' : 'Mark as Pending'}
                  </button>
                  <button
                    onClick={() => handleEditClick(schedule)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
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

export default ScheduleManagement;
