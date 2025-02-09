import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = ({ apiUrl, columns }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <table border="1">
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                        <th>Дії</th>
                    
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map(column => (
                            <td key={column}>{row[column] || "—"}</td>
                        ))}
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
