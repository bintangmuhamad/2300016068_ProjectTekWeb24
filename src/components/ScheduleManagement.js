// src/components/ScheduleManagement.js

import React, { useState, useEffect } from "react";

/**
 * BASE_URL untuk JSON Server.
 * Pastikan URL ini sesuai dengan lokasi di mana JSON Server berjalan.
 */
const BASE_URL = "http://localhost:5000";

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ date: "", type: "", description: "" });
  const [editScheduleId, setEditScheduleId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: "", type: "", description: "" });

  /**
   * Mengambil data jadwal dari JSON Server saat komponen dimuat.
   */
  useEffect(() => {
    fetch(`${BASE_URL}/schedules`)
      .then((response) => response.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error("Error fetching schedules:", error));
  }, []);

  /**
   * Menangani perubahan input pada form tambah.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Menambah jadwal baru ke JSON Server.
   */
  const addSchedule = () => {
    const { date, type, description } = newSchedule;

    if (date && type && description) {
      fetch(`${BASE_URL}/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newSchedule, status: "Belum Dilaksanakan" }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSchedules((prev) => [...prev, data]);
          setNewSchedule({ date: "", type: "", description: "" });
        })
        .catch((error) => console.error("Error adding schedule:", error));
    } else {
      alert("Harap isi semua field sebelum menambah jadwal.");
    }
  };

  /**
   * Menghapus jadwal dari JSON Server.
   */
  const deleteSchedule = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
      fetch(`${BASE_URL}/schedules/${id}`, { method: "DELETE" })
        .then(() => setSchedules((prev) => prev.filter((schedule) => schedule.id !== id)))
        .catch((error) => console.error("Error deleting schedule:", error));
    }
  };

  /**
   * Mengubah status jadwal antara "Belum Dilaksanakan" dan "Sudah Dilaksanakan".
   */
  const toggleStatus = (id) => {
    const schedule = schedules.find((s) => s.id === id);
    const updatedStatus = schedule.status === "Belum Dilaksanakan" ? "Sudah Dilaksanakan" : "Belum Dilaksanakan";

    fetch(`${BASE_URL}/schedules/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updatedStatus }),
    })
      .then(() => {
        setSchedules((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: updatedStatus } : s))
        );
      })
      .catch((error) => console.error("Error toggling schedule status:", error));
  };

  /**
   * Memulai proses edit jadwal.
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
   * Menyimpan perubahan jadwal ke JSON Server.
   */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { date, type, description } = editFormData;

    if (date && type && description) {
      fetch(`${BASE_URL}/schedules/${editScheduleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, type, description }),
      })
        .then((response) => response.json())
        .then((updatedSchedule) => {
          setSchedules((prev) =>
            prev.map((schedule) => (schedule.id === editScheduleId ? updatedSchedule : schedule))
          );
          setEditScheduleId(null);
          setEditFormData({ date: "", type: "", description: "" });
        })
        .catch((error) => console.error("Error updating schedule:", error));
    } else {
      alert("Harap isi semua field sebelum menyimpan perubahan.");
    }
  };

  /**
   * Membatalkan proses edit.
   */
  const handleCancelClick = () => {
    setEditScheduleId(null);
    setEditFormData({ date: "", type: "", description: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orangeGoPalm mb-4">Manajemen Perawatan</h2>

      {/* Form Tambah */}
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
          className="bg-orangeGoPalm text-white py-2 px-4 rounded hover:bg-greenGoPalm"
        >
          Tambah Jadwal
        </button>
      </div>

      {/* Form Edit */}
      {editScheduleId && (
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
            type="text"
            name="type"
            value={editFormData.type}
            onChange={(e) =>
              setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="Jenis Perawatan"
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

      {/* Tabel Jadwal */}
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tanggal</th>
            <th className="border px-4 py-2">Jenis Perawatan</th>
            <th className="border px-4 py-2">Deskripsi</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td className="border px-4 py-2">{schedule.date}</td>
              <td className="border px-4 py-2">{schedule.type}</td>
              <td className="border px-4 py-2">{schedule.description}</td>
              <td className={`border px-4 py-2 ${schedule.status === "Sudah Dilaksanakan" ? "text-green-600" : "text-red-600"}`}>
                {schedule.status}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => toggleStatus(schedule.id)}
                  className={`mr-2 px-3 py-1 rounded ${
                    schedule.status === "Belum Dilaksanakan"
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {schedule.status === "Belum Dilaksanakan" ? "Selesai" : "Pending"}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleManagement;
