import React from "react";

const DeleteForm = ({ item, onClose, onDelete }) => {
    const handleDelete = () => {
        onDelete(item.id); // Викликаємо функцію видалення з передачею ID елементу
        onClose(); // Закриваємо форму після видалення
    };

    return (
        <div className="modal-container">
            <div className="form-content">
                <h2>Видалення даних</h2>
                {Object.keys(item).map((key) => (
                    <div key={key}>
                        <label>{key}: </label>
                        <span>{item[key] || "—"}</span>
                    </div>
                ))}
                <button onClick={handleDelete}>Видалити</button>
                <button onClick={onClose}>Закрити</button>
            </div>
        </div>
    );
};

export default DeleteForm;
