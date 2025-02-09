import React, { useState } from "react";
import './vehicleForm.css';

const VehicleForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    make: initialData.make || "",
    model: initialData.model || "",
    year: initialData.year || "",
    registration_number: initialData.registration_number || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        <input name="make" value={formData.make} onChange={handleChange} placeholder="Марка" />
        <input name="model" value={formData.model} onChange={handleChange} placeholder="Модель" />
        <input name="year" value={formData.year} onChange={handleChange} placeholder="Рік випуску" />
        <input name="registration_number" value={formData.registration_number} onChange={handleChange} placeholder="Номер" />
        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
};

export default VehicleForm;
