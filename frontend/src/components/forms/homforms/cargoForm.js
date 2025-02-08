import React, { useState } from "react";
import './CargoForm.css';

const CargoForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    weight: initialData.weight || "",
    volume: initialData.volume || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Назва вантажу" />
        <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Маса" />
        <input name="volume" value={formData.volume} onChange={handleChange} placeholder="Об'єм" />
        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
};

export default CargoForm;
