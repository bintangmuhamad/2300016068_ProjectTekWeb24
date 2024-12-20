import React, { useState, useEffect } from 'react';

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ date: '', type: '', description: '' });

  // Mengambil data dari localStorage saat pertama kali komponen dimuat
  useEffect(() => {
    const savedSchedules = JSON.parse(localStorage.getItem('schedules'));
    if (savedSchedules) {
      setSchedules(savedSchedules);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const addSchedule = () => {
    if (newSchedule.date && newSchedule.type && newSchedule.description) {
      const updatedSchedules = [
        ...schedules,
        { ...newSchedule, id: schedules.length + 1, status: 'Belum Dilaksanakan' },
      ];
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan data ke localStorage
      setNewSchedule({ date: '', type: '', description: '' });
    }
  };

  const deleteSchedule = (id) => {
    const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
    setSchedules(updatedSchedules);
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // Menyimpan data yang sudah diperbarui
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-greenGoPalm mb-6">Manajemen Perawatan</h2>
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
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td className="border px-4 py-2">{schedule.date}</td>
              <td className="border px-4 py-2">{schedule.type}</td>
              <td className="border px-4 py-2">{schedule.description}</td>
              <td className="border px-4 py-2">{schedule.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteSchedule(schedule.id)}
                  className="text-red-500 hover:text-red-700"
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
