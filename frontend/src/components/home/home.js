import './home.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import DriverForm from '../forms/homforms/driver/driveradd/driverForm';
import EditDriverForm from '../forms/homforms/driver/formdriveredit/formdriveredit.js';
import ViewDriverForm from '../forms/homforms/driver/driver_view_form/driver_view_form.js';

Modal.setAppElement("#root");

const Dashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [formVisibility, setFormVisibility] = useState({
        add: false,
        edit: false,
        view: false,
    });
    const [selectedDriverId, setSelectedDriverId] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = () => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:8000/api/drivers/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            })
            .then((response) => {
                setDrivers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Помилка при завантаженні водіїв:", error);
                setError("Не вдалося завантажити водіїв.");
                setLoading(false);
            });
    };

    const handleAddItem = (data) => {
        axios
            .post("http://127.0.0.1:8000/api/drivers/", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            })
            .then((response) => {
                setDrivers([...drivers, response.data]);
                setFormVisibility({ ...formVisibility, add: false });
            })
            .catch((error) => {
                console.error("Помилка при додаванні водія:", error);
            });
    };

    const handleEditItem = (id, data) => {
        axios
            .put(`http://127.0.0.1:8000/api/drivers/${id}/`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            })
            .then((response) => {
                setDrivers(drivers.map((driver) => (driver.id === id ? response.data : driver)));
                setFormVisibility({ ...formVisibility, edit: false });
            })
            .catch((error) => {
                console.error("Помилка при редагуванні водія:", error);
                setError("Помилка при редагуванні водія.");
            });
    };

    const handleDeleteItem = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/drivers/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            })
            .then(() => {
                setDrivers(drivers.filter((driver) => driver.id !== id));
            })
            .catch((error) => {
                console.error("Помилка при видаленні водія:", error);
            });
    };

    const handleViewDriver = (driverId) => {
        setSelectedDriverId(driverId);
        setFormVisibility({ ...formVisibility, view: true });
    };

    useEffect(() => {
        if (selectedDriverId) {
            setLoading(true);
            axios
                .get(`http://127.0.0.1:8000/api/drivers/${selectedDriverId}/`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
                })
                .then((response) => {
                    setSelectedDriver(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Помилка при завантаженні водія:", error);
                    setLoading(false);
                });
        }
    }, [selectedDriverId]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        window.location.reload();
    };

    return (
        <div className="home-container">
            <h1>Диспетчерський інтерфейс</h1>
            <button className="logout-btn" onClick={handleLogout}>Вийти</button>

            <div className="table-section">
                <h2>Список водіїв</h2>
                <button onClick={() => setFormVisibility({ ...formVisibility, add: true })}>Додати водія</button>

                {formVisibility.add && (
                    <DriverForm
                        onSubmit={handleAddItem}
                        onClose={() => setFormVisibility({ ...formVisibility, add: false })}
                    />
                )}

                {formVisibility.edit && selectedDriver && (
                    <EditDriverForm
                        driver={selectedDriver} // Передаємо об’єкт вибраного водія
                        onEdit={handleEditItem}
                        onClose={() => setFormVisibility({ ...formVisibility, edit: false })}
                    />
                )}

                {formVisibility.view && selectedDriver && (
                    <ViewDriverForm
                        driver={selectedDriver}
                        onClose={() => setFormVisibility({ ...formVisibility, view: false })}
                    />
                )}

                <table>
                    <thead>
                        <tr>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>По батькові</th>
                            <th>Номер телефону</th>
                            <th>Адреса</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6">Завантаження...</td></tr>
                        ) : error ? (
                            <tr><td colSpan="6">{error}</td></tr>
                        ) : (
                            drivers.map((driver) => (
                                <tr key={driver.id}>
                                    <td>{driver.first_name}</td>
                                    <td>{driver.last_name}</td>
                                    <td>{driver.middle_name || "Немає"}</td>
                                    <td>{driver.phone_number}</td>
                                    <td>{driver.address}</td>
                                    <td>
                                        <button onClick={() => handleViewDriver(driver.id)}>Переглянути</button>
                                        <button onClick={() => {
                                            setSelectedDriverId(driver.id);
                                            setFormVisibility({ ...formVisibility, edit: true });
                                        }}>Редагувати</button>
                                        <button onClick={() => handleDeleteItem(driver.id)}>Видалити</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
