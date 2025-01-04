// src/components/Report.js

import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Komponen Report untuk mengelola catatan laporan (CRUD)
 */
function Report() {
  const [reports, setReports] = useState([]); // State untuk data laporan
  const [newReport, setNewReport] = useState({ note: "", date: "" }); // State untuk menambah laporan
  const [editReportId, setEditReportId] = useState(null); // ID laporan yang sedang diedit
  const [editFormData, setEditFormData] = useState({ note: "", date: "" }); // State form edit laporan

  const baseURL = "http://localhost:5000/reports"; // Endpoint API

  // Mendapatkan data laporan dari server JSON saat pertama kali komponen dimuat
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(baseURL);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error.message);
      }
    };

    fetchReports();
  }, []);

  // Menangani perubahan input pada form tambah laporan
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  // Menangani perubahan input pada form edit laporan
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Menambah laporan baru
  const addReport = async () => {
    if (newReport.note && newReport.date) {
      try {
        const response = await axios.post(baseURL, newReport);
        setReports([...reports, response.data]);
        setNewReport({ note: "", date: "" }); // Reset form
      } catch (error) {
        console.error("Error adding report:", error.message);
      }
    } else {
      alert("Harap isi semua field!");
    }
  };

  // Menghapus laporan berdasarkan ID
  const deleteReport = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error.message);
    }
  };

  // Mengedit laporan
  const editReport = (report) => {
    setEditReportId(report.id);
    setEditFormData({ note: report.note, date: report.date });
  };

  // Menyimpan perubahan laporan
  const saveEditedReport = async (id) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, editFormData);
      setReports(
        reports.map((report) =>
          report.id === id ? { ...response.data } : report
        )
      );
      setEditReportId(null); // Selesai edit
      setEditFormData({ note: "", date: "" }); // Reset form edit
    } catch (error) {
      console.error("Error updating report:", error.message);
    }
  };

  // Membatalkan proses edit
  const cancelEdit = () => {
    setEditReportId(null);
    setEditFormData({ note: "", date: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-greenGoPalm mb-4">
        Laporan Perawatan & Panen
      </h2>

      {/* Form Tambah Laporan */}
      <div className="mb-6">
        <input
          type="text"
          name="note"
          value={newReport.note}
          onChange={handleInputChange}
          placeholder="Catatan"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="date"
          name="date"
          value={newReport.date}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={addReport}
          className="bg-orangeGoPalm text-white py-2 px-4 rounded hover:bg-greenGoPalm"
        >
          Tambah Laporan
        </button>
      </div>

      {/* Tabel Laporan */}
      <table className="min-w-full bg-white rounded shadow-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Catatan</th>
            <th className="px-4 py-2 border-b">Tanggal</th>
            <th className="px-4 py-2 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) =>
            editReportId === report.id ? (
              <tr key={report.id}>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="note"
                    value={editFormData.note}
                    onChange={handleEditInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => saveEditedReport(report.id)}
                    className="bg-greenGoPalm text-white py-1 px-3 rounded mr-2"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white py-1 px-3 rounded"
                  >
                    Batal
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={report.id}>
                <td className="px-4 py-2 border-b">{report.note}</td>
                <td className="px-4 py-2 border-b">{report.date}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => editReport(report)}
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReport(report.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Report;
