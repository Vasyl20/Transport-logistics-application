import React, { useState, useEffect } from "react";
import './driverForm.css';

const DriverForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    middle_name: initialData.middle_name || "",
    phone_number: initialData.phone_number || "",
    address: initialData.address || "",
  });

  // Використання useEffect для відстеження змін стану
  useEffect(() => {
    console.log("Поточний стан форми:", formData);
  }, [formData]);

  // Функція для обробки змін у полях вводу
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Змінено поле ${name}:`, value); // Виводимо зміни в консоль
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Функція для обробки відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Дані форми перед відправкою:", formData); // Виводимо дані перед відправкою

    // Перевірка на порожні поля
    if (!formData.first_name || !formData.last_name || !formData.phone_number || !formData.address) {
      console.error("Помилка: усі поля є обов'язковими.");
      alert("Будь ласка, заповніть всі обов'язкові поля.");
      return;
    }

    // Перевірка на коректний номер телефону (базова перевірка)
    if (!/^\d{10}$/.test(formData.phone_number)) {
      console.error("Помилка: некоректний номер телефону.");
      alert("Номер телефону повинен містити 10 цифр.");
      return;
    }

    // Якщо все в порядку, викликаємо onSubmit
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Ім'я *"
          required
        />
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Прізвище *"
          required
        />
        <input
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          placeholder="По батькові"
        />
        <input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Номер телефону *"
          required
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Адреса *"
          required
        />
        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
};

export default DriverForm;
