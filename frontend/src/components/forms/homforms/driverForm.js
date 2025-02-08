import React, { useState } from "react";
import './DriverForm.css';

const DriverForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    middle_name: initialData.middle_name || "",
    phone_number: initialData.phone_number || "",
    address: initialData.address || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Ім'я" />
        <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Прізвище" />
        <input name="middle_name" value={formData.middle_name} onChange={handleChange} placeholder="По батькові" />
        <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Номер телефону" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Адреса" />
        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
};

export default DriverForm;
