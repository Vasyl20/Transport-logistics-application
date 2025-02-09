import React from 'react';
import './driver_view_form.css'; // Підключимо CSS файл для стилів

const ViewDriverForm = ({ driver, onClose }) => {
  return (
    <div className="modal-container">
      <div className="form-content">
        <h2>Перегляд водія</h2>
        <div>
          <label>Ім'я: </label>
          <span>{driver.first_name}</span>
        </div>
        <div>
          <label>Прізвище: </label>
          <span>{driver.last_name}</span>
        </div>
        <div>
          <label>По батькові: </label>
          <span>{driver.middle_name || "Немає"}</span>
        </div>
        <div>
          <label>Номер телефону: </label>
          <span>{driver.phone_number}</span>
        </div>
        <div>
          <label>Адреса: </label>
          <span>{driver.address}</span>
        </div>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default ViewDriverForm;
