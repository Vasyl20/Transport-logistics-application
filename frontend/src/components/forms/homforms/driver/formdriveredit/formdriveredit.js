import React, { useState, useEffect } from "react";

const EditDriverForm = ({ driver, onEdit, onClose }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        middle_name: "",
        phone_number: "",
        address: "",
    });

    useEffect(() => {
        if (driver) {
            setFormData({
                first_name: driver.first_name || "",
                last_name: driver.last_name || "",
                middle_name: driver.middle_name || "",
                phone_number: driver.phone_number || "",
                address: driver.address || "",
            });
        }
    }, [driver]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.phone_number || !formData.address) {
            alert("Будь ласка, заповніть всі обов'язкові поля.");
            return;
        }

        if (!/^\d{10}$/.test(formData.phone_number)) {
            alert("Номер телефону повинен містити 10 цифр.");
            return;
        }

        onEdit(driver.id, formData);
        onClose();
    };

    return driver ? (
        <div className="form-container">
            <h2>Редагування водія</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Ім'я *"
                />
                <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Прізвище *"
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
                />
                <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Адреса *"
                />
                <button type="submit">Оновити</button>
                <button type="button" onClick={onClose}>
                    Скасувати
                </button>
            </form>
        </div>
    ) : (
        <p>Завантаження...</p>
    );
};

export default EditDriverForm;
