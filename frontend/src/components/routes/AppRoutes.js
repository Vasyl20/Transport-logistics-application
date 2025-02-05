import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../home/home"; 
import Login from "../login/login"; 
import NotFound from "../error/404/notFound";

// Захищений маршрут
const ProtectedRoute = ({ children }) => {
  // Перевірка наявності токена в localStorage
  const token = localStorage.getItem("access_token");

  // Якщо токен відсутній, перенаправляємо на сторінку логіну
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Перевірка на токен для доступу до головної сторінки */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />

        

        <Route path="/" element={<Navigate to="/login" />} /> {/*  Перенаправлення на login */} 
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
