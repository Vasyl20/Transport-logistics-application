import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>Схоже, що ви зайшли не туди.</p>
      <Link to="/home">Повернутися на сторінку ВХІД</Link>
    </div>
  );
};

export default NotFound;
