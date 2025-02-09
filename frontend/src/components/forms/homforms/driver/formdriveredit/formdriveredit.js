import React, { useState, useEffect } from "react";
import axios from "axios";
// import './driverForm.css';

const EditDriverForm = ({ driverId, onEdit, onClose }) => {
  // Стан для зберігання даних форми
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    phone_number: "",
    address: "",
  });

  // Логування початкового стану форми
  console.log("Initial form data:", formData);

  // Ефект для завантаження даних водія за id при завантаженні форми
  useEffect(() => {
    if (driverId) {
      // Логування перед викликом API
      console.log("Fetching driver data for ID:", driverId);

      // Виклик API для отримання даних водія
      axios.get(`http://127.0.0.1:8000/api/drivers/${driverId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      })
      .then((response) => {
        // Логування отриманих даних з API
        console.log("Driver data received from API:", response.data);

        // Оновлення стану форми з отриманими даними
        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          middle_name: response.data.middle_name || "",
          phone_number: response.data.phone_number,
          address: response.data.address,
        });

        // Логування оновленого стану форми
        console.log("Form data after update:", {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          middle_name: response.data.middle_name || "",
          phone_number: response.data.phone_number,
          address: response.data.address,
        });
      })
      .catch((error) => {
        // Логування помилки, якщо щось пішло не так
        console.error("Помилка при завантаженні даних водія:", error);
      });
    } else {
      // Логування, якщо driverId не передано
      console.error("driverId не передано або він не валідний");
    }
  }, [driverId]); // Залежність від driverId, щоб форма оновлювалася при зміні ID

  // Функція для обробки змін у полях вводу
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Логування при зміні значення поля
    console.log(`Field "${name}" changed to:`, value);
  };

  // Функція для обробки відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();

    // Логування даних форми перед відправкою
    console.log("Form data to be submitted:", formData);

    // Перевірка на порожні поля
    if (!formData.first_name || !formData.last_name || !formData.phone_number || !formData.address) {
      alert("Будь ласка, заповніть всі обов'язкові поля.");
      return;
    }

    // Перевірка на коректний номер телефону (базова перевірка)
    if (!/^\d{10}$/.test(formData.phone_number)) {
      alert("Номер телефону повинен містити 10 цифр.");
      return;
    }

    // Виклик функції редагування з id та новими даними
    onEdit(driverId, formData);

    // Закриття форми після успішного редагування
    onClose();
  };

  return (
    <div className="form-container">
      <h2>Редагування водія</h2>
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
        <button type="submit">Оновити</button>
        <button type="button" onClick={onClose}>Скасувати</button>
      </form>
    </div>
  );
};

export default EditDriverForm;
