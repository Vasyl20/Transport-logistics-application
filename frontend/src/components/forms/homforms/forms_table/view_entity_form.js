import React from "react";
// import "./form.css";

const ViewForm = ({ item, onClose }) => {
    return (
        <div className="modal-container">
            <div className="form-content">
                <h2>Перегляд даних</h2>
                {Object.keys(item).map((key) => (
                    <div key={key}>
                        <label>{key}: </label>
                        <span>{item[key] || "—"}</span>
                    </div>
                ))}
                <button onClick={onClose}>Закрити</button>
            </div>
        </div>
    );
};

export default ViewForm;
