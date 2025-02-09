import React, { useState } from "react";
import axios from "axios";
// import "./form.css";

const EditForm = ({ item, apiUrl, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(item);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.put(`${apiUrl}${item.id}/`, formData)
            .then(response => {
                onUpdate(response.data);
                onClose();
            })
            .catch(error => {
                console.error("Помилка оновлення даних:", error);
                setLoading(false);
            });
    };

    return (
        <div className="modal-container">
            <div className="form-content">
                <h2>Редагування даних</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(item).map((key) => (
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
                        {loading ? "Збереження..." : "Зберегти"}
                    </button>
                    <button type="button" onClick={onClose}>Скасувати</button>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
