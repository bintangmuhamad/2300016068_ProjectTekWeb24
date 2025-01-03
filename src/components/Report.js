// src/components/Report.js

import React, { useState, useEffect } from "react";

/**
 * BASE_URL untuk JSON Server.
 * Pastikan URL ini sesuai dengan lokasi di mana JSON Server berjalan.
 */
const BASE_URL = "http://localhost:5000";

function Report() {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({ title: "", content: "" });
  const [editReportId, setEditReportId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", content: "" });

  /**
   * Mengambil data laporan dari JSON Server saat komponen dimuat.
   */
  useEffect(() => {
    fetch(`${BASE_URL}/reports`)
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  /**
   * Menangani perubahan input pada form tambah laporan.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Menambah laporan baru ke JSON Server.
   */
  const addReport = () => {
    const { title, content } = newReport;

    if (title && content) {
      fetch(`${BASE_URL}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReport),
      })
        .then((response) => response.json())
        .then((data) => {
          setReports((prev) => [...prev, data]);
          setNewReport({ title: "", content: "" });
        })
        .catch((error) => console.error("Error adding report:", error));
    } else {
      alert("Harap isi semua field sebelum menambah laporan.");
    }
  };

  /**
   * Menghapus laporan dari JSON Server.
   */
  const deleteReport = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      fetch(`${BASE_URL}/reports/${id}`, { method: "DELETE" })
        .then(() => setReports((prev) => prev.filter((report) => report.id !== id)))
        .catch((error) => console.error("Error deleting report:", error));
    }
  };

  /**
   * Memulai proses edit laporan.
   */
  const handleEditClick = (report) => {
    setEditReportId(report.id);
    setEditFormData({
      title: report.title,
      content: report.content,
    });
  };

  /**
   * Menyimpan perubahan laporan ke JSON Server.
   */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { title, content } = editFormData;

    if (title && content) {
      fetch(`${BASE_URL}/reports/${editReportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      })
        .then((response) => response.json())
        .then((updatedReport) => {
          setReports((prev) =>
            prev.map((report) => (report.id === editReportId ? updatedReport : report))
          );
          setEditReportId(null);
          setEditFormData({ title: "", content: "" });
        })
        .catch((error) => console.error("Error updating report:", error));
    } else {
      alert("Harap isi semua field sebelum menyimpan perubahan.");
    }
  };

  /**
   * Membatalkan proses edit.
   */
  const handleCancelClick = () => {
    setEditReportId(null);
    setEditFormData({ title: "", content: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-greenGoPalm mb-6">Laporan</h2>

      {/* Form Tambah Laporan */}
      <div className="mb-6">
        <input
          type="text"
          name="title"
          value={newReport.title}
          onChange={handleInputChange}
          placeholder="Judul Laporan"
          className="border border-gray-300 p-2 rounded mr-2 mb-2 w-full"
        />
        <textarea
          name="content"
          value={newReport.content}
          onChange={handleInputChange}
          placeholder="Isi Laporan"
          className="border border-gray-300 p-2 rounded mr-2 mb-2 w-full"
          rows="4"
        />
        <button
          onClick={addReport}
          className="bg-orangeGoPalm text-white py-2 px-4 rounded hover:bg-greenGoPalm transition duration-300"
        >
          Tambah Laporan
        </button>
      </div>

      {/* Form Edit Laporan */}
      {editReportId && (
        <form onSubmit={handleEditFormSubmit} className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4 text-greenGoPalm">Edit Laporan</h3>
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={(e) =>
              setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="Judul Laporan"
            className="border border-gray-300 p-2 rounded mr-2 mb-2 w-full"
          />
          <textarea
            name="content"
            value={editFormData.content}
            onChange={(e) =>
              setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="Isi Laporan"
            className="border border-gray-300 p-2 rounded mr-2 mb-2 w-full"
            rows="4"
          />
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

      {/* Tabel Laporan */}
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Judul</th>
            <th className="border px-4 py-2">Isi</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">Tidak ada laporan.</td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.id}>
                <td className="border px-4 py-2">{report.title}</td>
                <td className="border px-4 py-2">{report.content}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(report)}
                    className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReport(report.id)}
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

export default Report;
