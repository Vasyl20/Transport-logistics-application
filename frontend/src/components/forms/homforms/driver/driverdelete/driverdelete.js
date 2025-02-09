import React, { useState } from "react";
import './driverdelete.css';

const DriverForm = ({ onSubmit, onDelete, initialData = {} }) => {
  const [formData, setFormData] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    middle_name: initialData.middle_name || "",
    phone_number: initialData.phone_number || "",
    address: initialData.address || "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Функція для обробки змін у полях вводу
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Функція для обробки відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();

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

    // Викликаємо onSubmit для збереження даних
    onSubmit(formData);
  };

  // Функція для відкриття модального вікна видалення
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Функція для закриття модального вікна видалення
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  // Функція для підтвердження видалення
  const handleConfirmDelete = () => {
    onDelete(); // Викликаємо функцію видалення
    setShowDeleteModal(false);
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
        <button
          type="button"
          onClick={handleDeleteClick}
          style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
        >
          Видалити
        </button>
      </form>

      {/* Модальне вікно для підтвердження видалення */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ви впевнені, що хочете видалити цього водія?</h2>
            <p>Інформація про водія:</p>
            <ul>
              <li><strong>Ім'я:</strong> {formData.first_name}</li>
              <li><strong>Прізвище:</strong> {formData.last_name}</li>
              <li><strong>По батькові:</strong> {formData.middle_name}</li>
              <li><strong>Телефон:</strong> {formData.phone_number}</li>
              <li><strong>Адреса:</strong> {formData.address}</li>
            </ul>
            <button onClick={handleConfirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>
              Так, видалити
            </button>
            <button onClick={handleCancelDelete} style={{ marginLeft: '10px' }}>
              Скасувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverForm;
