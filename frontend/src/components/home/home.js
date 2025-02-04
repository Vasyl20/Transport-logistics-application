import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("Token:", token);
    if (!token) {
      console.log("No token found, redirecting...");
      navigate("/login");
    }
  }, [navigate]);

  console.log("Rendering Home component...");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Welcome to Home Page !!!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
