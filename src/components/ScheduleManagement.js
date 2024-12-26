// src/components/ScheduleManagement.js

import React, { useState, useEffect } from 'react';
import data from '../data/data';

/**
 * Komponen ScheduleManagement untuk mengelola jadwal perawatan
 * Fitur: Tambah, Hapus, Edit, dan Toggle Status Jadwal
 */
function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ date: '', type: '', description: '' });
  const [editScheduleId, setEditScheduleId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: '', type: '', description: '' });

  // Mengambil data dari localStorage atau menggunakan data default saat komponen dimuat
  useEffect(() => {
    const savedSchedules = JSON.parse(localStorage.getItem('schedules'));
    if (savedSchedules) {
      setSchedules(savedSchedules);
    } else {
      setSchedules(data.schedules);
      localStorage.setItem('schedules', JSON.stringify(data.schedules));
    }
  }, []);

  /**
   * Menangani perubahan input pada formulir tambah jadwal
   * @param {object} e - Event perubahan input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Menambah jadwal perawatan baru
   */
  const addSchedule = () => {
    const { date, type, description } = newSchedule;
    if (date && type && description) {
      const updatedSchedules = [
        ...schedules,
        { ...newSchedule, id: Date.now(), status: 'Belum Dilaksanakan' },
      ];
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan ke localStorage
      setNewSchedule({ date: '', type: '', description: '' }); // Reset form
    } else {
      alert('Harap isi semua field sebelum menambah jadwal.');
    }
  };

  /**
   * Menghapus jadwal berdasarkan ID
   * @param {number} id - ID jadwal yang akan dihapus
   */
  const deleteSchedule = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan perubahan ke localStorage
    }
  };

  /**
   * Mengubah status jadwal antara "Belum Dilaksanakan" dan "Sudah Dilaksanakan"
   * @param {number} id - ID jadwal yang akan diubah statusnya
   */
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
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan perubahan ke localStorage
  };

  /**
   * Memulai proses edit jadwal
   * @param {object} schedule - Objek jadwal yang akan diedit
   */
  const handleEditClick = (schedule) => {
    setEditScheduleId(schedule.id);
    setEditFormData({
      date: schedule.date,
      type: schedule.type,
      description: schedule.description,
    });
  };

  /**
   * Menangani perubahan input pada formulir edit jadwal
   * @param {object} e - Event perubahan input
   */
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Menyimpan perubahan jadwal yang diedit
   * @param {object} e - Event submit form
   */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { date, type, description } = editFormData;

    if (date && type && description) {
      const updatedSchedules = schedules.map((schedule) => {
        if (schedule.id === editScheduleId) {
          return {
            ...schedule,
            date,
            type,
            description,
          };
        }
        return schedule;
      });
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan perubahan ke localStorage
      setEditScheduleId(null);
      setEditFormData({ date: '', type: '', description: '' }); // Reset form edit
    } else {
      alert('Harap isi semua field sebelum menyimpan perubahan.');
    }
  };

  /**
   * Membatalkan proses edit jadwal
   */
  const handleCancelClick = () => {
    setEditScheduleId(null);
    setEditFormData({ date: '', type: '', description: '' });
  };

  return (
    <div className="p-6">
      {/* Formulir Tambah Jadwal Perawatan */}
      <h3 className="text-xl font-semibold text-greenGoPalm mb-4">Tambah Jadwal Perawatan</h3>
      <div className="flex flex-wrap mb-6">
        <input
          type="date"
          name="date"
          value={newSchedule.date}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded mr-2 mb-2"
          required
        />
        <input
          type="text"
          name="type"
          value={newSchedule.type}
          onChange={handleInputChange}
          placeholder="Jenis Perawatan"
          className="border border-gray-300 p-2 rounded mr-2 mb-2"
          required
        />
        <input
          type="text"
          name="description"
          value={newSchedule.description}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="border border-gray-300 p-2 rounded mr-2 mb-2"
          required
        />
        <button
          onClick={addSchedule}
          className="bg-greenGoPalm text-white py-2 px-4 rounded-full hover:bg-orangeGoPalm transition duration-300"
        >
          Tambah Jadwal
        </button>
      </div>

      {/* Formulir Edit Jadwal Perawatan */}
      {editScheduleId && (
        <form onSubmit={handleEditFormSubmit} className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4 text-greenGoPalm">Edit Jadwal Perawatan</h3>
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
              type="text"
              name="type"
              value={editFormData.type}
              onChange={handleEditFormChange}
              placeholder="Jenis Perawatan"
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

      {/* Tabel Jadwal Perawatan */}
      <h3 className="text-xl font-semibold text-greenGoPalm mb-4">Daftar Jadwal Perawatan</h3>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Tanggal</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Jenis</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Deskripsi</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Status</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Aksi</th>
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
                <td className="px-4 py-2 border-b border-gray-200">{schedule.date}</td>
                <td className="px-4 py-2 border-b border-gray-200">{schedule.type}</td>
                <td className="px-4 py-2 border-b border-gray-200">{schedule.description}</td>
                <td className={`px-4 py-2 border-b border-gray-200 ${schedule.status === 'Sudah Dilaksanakan' ? 'text-green-600' : 'text-red-600'}`}>
                  {schedule.status}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={() => toggleStatus(schedule.id)}
                    className={`mr-2 px-3 py-1 rounded ${schedule.status === 'Belum Dilaksanakan' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                  >
                    {schedule.status === 'Belum Dilaksanakan' ? 'Mark as Done' : 'Mark as Pending'}
                  </button>
                  <button
                    onClick={() => handleEditClick(schedule)}
                    className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
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

export default ScheduleManagement;
