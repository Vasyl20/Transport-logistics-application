// import React, { useState, useEffect } from "react";

// const EditDriverForm = ({ driverId, onEdit, onClose }) => {
//   const [driverData, setDriverData] = useState({
//     first_name: '',
//     last_name: '',
//     middle_name: '',
//     phone_number: '',
//     address: ''
//   });

//   useEffect(() => {
//     // Завантажити дані водія для редагування
//     if (driverId) {
//       axios.get(`http://127.0.0.1:8000/api/drivers/${driverId}/`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
//       })
//       .then((response) => {
//         setDriverData(response.data);
//       })
//       .catch((error) => console.error("Помилка при завантаженні даних водія:", error));
//     }
//   }, [driverId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDriverData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onEdit(driverId, driverData);
//   };

//   return (
//     <Modal isOpen={true} onRequestClose={onClose}>
//       <h2>Редагувати водія</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Ім'я:
//           <input
//             type="text"
//             name="first_name"
//             value={driverData.first_name}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Прізвище:
//           <input
//             type="text"
//             name="last_name"
//             value={driverData.last_name}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           По батькові:
//           <input
//             type="text"
//             name="middle_name"
//             value={driverData.middle_name}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Номер телефону:
//           <input
//             type="text"
//             name="phone_number"
//             value={driverData.phone_number}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Адреса:
//           <input
//             type="text"
//             name="address"
//             value={driverData.address}
//             onChange={handleInputChange}
//           />
//         </label>
//         <button type="submit">Зберегти</button>
//         <button type="button" onClick={onClose}>Закрити</button>
//       </form>
//     </Modal>
//   );
// };

// export default EditDriverForm;
