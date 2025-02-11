import React, { useState } from "react";
import axios from "axios";

const AddForm = ({ apiUrl, columns, onClose, onAdd }) => {
    const initialFormState = columns.reduce((acc, column) => {
        if (column !== "id") acc[column] = "";
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post(apiUrl, formData)
            .then(response => {
                onAdd(response.data);
                onClose();
            })
            .catch(error => {
                console.error("Помилка додавання запису:", error);
                setLoading(false);
            });
    };

    return (
        <div className="modal-container">
            <div className="form-content">
                <h2>Додавання нового запису</h2>
                <form onSubmit={handleSubmit}>
                    {columns.filter(column => column !== "id").map((key) => (
                        <div key={key}>
                            <label>{key}: </label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key] || ""}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit" disabled={loading}>
                        {loading ? "Додавання..." : "Додати"}
                    </button>
                    <button type="button" onClick={onClose}>Скасувати</button>
                </form>
            </div>
        </div>
    );
};

export default AddForm;