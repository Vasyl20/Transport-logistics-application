import React, { useState } from "react";
import './routeForm.css';

const RouteForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    start_location: initialData.start_location || "",
    end_location: initialData.end_location || "",
    distance: initialData.distance || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        <input name="start_location" value={formData.start_location} onChange={handleChange} placeholder="Місце відправлення" />
        <input name="end_location" value={formData.end_location} onChange={handleChange} placeholder="Місце призначення" />
        <input name="distance" value={formData.distance} onChange={handleChange} placeholder="Дистанція" />
        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
};

export default RouteForm;
