import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewForm from "./view_entity_form";
import EditForm from "./edit_form";
import AddForm from "./add_form";
import DeleteForm from "./delete_form"; // Імпортуємо нову форму для видалення

const DataTable = ({ apiUrl, columns }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formVisibility, setFormVisibility] = useState({ view: false, edit: false, add: false, delete: false });

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Помилка завантаження даних:", error);
                setError("Не вдалося отримати дані.");
                setLoading(false);
            });
    }, [apiUrl]);

    const handleView = (item) => {
        setSelectedItem(item);
        setFormVisibility({ view: true, edit: false, add: false, delete: false });
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setFormVisibility({ view: false, edit: true, add: false, delete: false });
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setFormVisibility({ view: false, edit: false, add: false, delete: true });
    };

    const handleAdd = () => {
        setFormVisibility({ view: false, edit: false, add: true, delete: false });
    };

    const handleUpdate = (updatedItem) => {
        setData(data.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setFormVisibility({ ...formVisibility, edit: false });
    };

    const handleAddItem = (newItem) => {
        setData([...data, newItem]);
        setFormVisibility({ ...formVisibility, add: false });
    };

    const handleDeleteItem = (id) => {
        axios.delete(`${apiUrl}${id}/`)
            .then(() => {
                setData(data.filter(item => item.id !== id)); // Видаляємо елемент зі списку
                setFormVisibility({ ...formVisibility, delete: false });
            })
            .catch(error => {
                console.error("Помилка видалення даних:", error);
            });
    };

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column}>{column}</th>
                        ))}
                        <th>Дії
                            <button onClick={handleAdd}>Додати</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map(column => (
                                <td key={column}>{row[column] || "—"}</td>
                            ))}
                            <td>
                                <button onClick={() => handleView(row)}>Переглянути</button>
                                <button onClick={() => handleEdit(row)}>Редагувати</button>
                                <button onClick={() => handleDelete(row)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {formVisibility.view && selectedItem && (
                <ViewForm
                    item={selectedItem}
                    onClose={() => setFormVisibility({ ...formVisibility, view: false })}
                />
            )}

            {formVisibility.edit && selectedItem && (
                <EditForm
                    item={selectedItem}
                    apiUrl={apiUrl}
                    onClose={() => setFormVisibility({ ...formVisibility, edit: false })}
                    onUpdate={handleUpdate}
                />
            )}

            {formVisibility.add && (
                <AddForm
                    apiUrl={apiUrl}
                    columns={columns}
                    onClose={() => setFormVisibility({ ...formVisibility, add: false })}
                    onAdd={handleAddItem}
                />
            )}

            {formVisibility.delete && selectedItem && (
                <DeleteForm
                    item={selectedItem}
                    onClose={() => setFormVisibility({ ...formVisibility, delete: false })}
                    onDelete={handleDeleteItem}
                />
            )}
        </div>
    );
};

export default DataTable;
