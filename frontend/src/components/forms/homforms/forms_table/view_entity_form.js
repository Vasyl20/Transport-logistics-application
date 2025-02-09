import React from 'react';
// import './view_entity_form.css';

const ViewEntityForm = ({ entity, onClose }) => {
    return (
        <div className="modal-container">
            <div className="form-content">
                <h2>Детальна інформація</h2>
                {Object.keys(entity).map((key) => (
                    <div key={key}>
                        <label>{key.replace('_', ' ')}:</label>
                        <span>{entity[key] || "—"}</span>
                    </div>
                ))}
                <button onClick={onClose}>Закрити</button>
            </div>
        </div>
    );
};

export default ViewEntityForm;
