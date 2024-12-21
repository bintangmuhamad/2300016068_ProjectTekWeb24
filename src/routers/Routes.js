// src/routes/Routes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Schedule from '../pages/Schedule';
import Harvest from '../pages/Harvest';
import ReportPage from '../pages/ReportPage'; // Pastikan nama file sesuai

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/harvest" element={<Harvest />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  );
}

export default RouteList;
