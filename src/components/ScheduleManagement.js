import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Komponen ScheduleManagement untuk mengelola jadwal perawatan.
 * - Responsif untuk berbagai ukuran layar dengan tabel adaptif.
 * - Fitur CRUD: Tambah, Hapus, Edit, dan Toggle Status Jadwal.
 */
function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ date: '', type: '', description: '' });
  const [editScheduleId, setEditScheduleId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: '', type: '', description: '' });

  // Fetch data dari server saat komponen dimuat
  useEffect(() => {
    axios.get('http://localhost:5000/schedules').then((response) => {
      setSchedules(response.data);
    });
  }, []);

  // Handler perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  // Tambah jadwal baru
  const addSchedule = () => {
    if (newSchedule.date && newSchedule.type && newSchedule.description) {
      axios
        .post('http://localhost:5000/schedules', { ...newSchedule, status: 'Belum Dilaksanakan' })
        .then((response) => {
          setSchedules([...schedules, response.data]);
          setNewSchedule({ date: '', type: '', description: '' });
        });
    } else {
      alert('Harap isi semua field sebelum menambah jadwal.');
    }
  };

  // Hapus jadwal berdasarkan ID
  const deleteSchedule = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      axios.delete(`http://localhost:5000/schedules/${id}`).then(() => {
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
      });
    }
  };

  // Edit jadwal
  const handleEditClick = (schedule) => {
    setEditScheduleId(schedule.id);
    setEditFormData({
      date: schedule.date,
      type: schedule.type,
      description: schedule.description,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/schedules/${editScheduleId}`, editFormData).then(() => {
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === editScheduleId ? { ...schedule, ...editFormData } : schedule
        )
      );
      setEditScheduleId(null);
      setEditFormData({ date: '', type: '', description: '' });
    });
  };

  const handleCancelClick = () => {
    setEditScheduleId(null);
    setEditFormData({ date: '', type: '', description: '' });
  };

  // Toggle status jadwal
  const toggleStatus = (id) => {
    const schedule = schedules.find((schedule) => schedule.id === id);
    const updatedSchedule = {
      ...schedule,
      status: schedule.status === 'Belum Dilaksanakan' ? 'Sudah Dilaksanakan' : 'Belum Dilaksanakan',
    };
    axios.put(`http://localhost:5000/schedules/${id}`, updatedSchedule).then(() => {
      setSchedules(
        schedules.map((schedule) => (schedule.id === id ? updatedSchedule : schedule))
      );
    });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-greenGoPalm mb-4">Manajemen Jadwal Perawatan</h2>

      {/* Form Tambah Jadwal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          name="date"
          value={newSchedule.date}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="type"
          value={newSchedule.type}
          onChange={handleInputChange}
          placeholder="Jenis Perawatan"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="description"
          value={newSchedule.description}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={addSchedule}
          className="bg-greenGoPalm text-white py-2 px-4 rounded w-full md:col-span-1 hover:bg-orangeGoPalm transition duration-300"
        >
          Tambah Jadwal
        </button>
      </div>

      {/* Form Edit Jadwal */}
      {editScheduleId && (
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
              type="text"
              name="type"
              value={editFormData.type}
              onChange={handleEditFormChange}
              placeholder="Jenis Perawatan"
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

      {/* Tabel Jadwal */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Tanggal</th>
              <th className="px-4 py-2 border-b">Jenis</th>
              <th className="px-4 py-2 border-b">Deskripsi</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="px-4 py-2 border-b">{schedule.date}</td>
                <td className="px-4 py-2 border-b">{schedule.type}</td>
                <td className="px-4 py-2 border-b">{schedule.description}</td>
                <td
                  className={`px-4 py-2 border-b ${
                    schedule.status === 'Sudah Dilaksanakan' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {schedule.status}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => toggleStatus(schedule.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => handleEditClick(schedule)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
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

export default ScheduleManagement;
