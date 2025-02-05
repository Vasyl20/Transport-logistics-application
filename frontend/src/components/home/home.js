import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './home.css';  // Імпортуємо CSS файл

const Home = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("No token found, redirecting...");
      navigate("/login");
    } else {
      // Якщо є токен, отримуємо замовлення
      axios
        .get("http://127.0.0.1:8000/api/orders/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Диспетчерський інтерфейс</h1>
      <button onClick={handleLogout}>Logout</button>

      <div className="orders-list">
        <h2>Список замовлень</h2>
        <table>
          <thead>
            <tr>
              <th>Номер замовлення</th>
              <th>Водій</th>
              <th>Транспортний засіб</th>
              <th>Статус</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.order_number}</td>
                  <td>{order.driver}</td>
                  <td>{order.vehicle}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Завантаження замовлень...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
