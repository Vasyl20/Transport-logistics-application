import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../home/home"; 
import Login from "../login/login"; 
import NotFound from "../error/404/notFound";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Navigate to="/login" />} /> {/* Перенаправлення на login */}
        <Route path="*" element={<NotFound />} /> {/* Всі невідомі маршрути → 404 */}

      </Routes>
    </Router>
  );
}

export default AppRoutes;
