import React from 'react';
import DataTable from './data_table';

const Tables = () => {
    return (
        <div>
            <h2>Водії</h2>
            <DataTable 
                apiUrl="http://127.0.0.1:8000/api/drivers/" 
                columns={["id", "first_name", "last_name", "middle_name", "phone_number", "address"]} 
            />

            <h2>Транспорт</h2>
            <DataTable 
                apiUrl="http://127.0.0.1:8000/api/vehicles/" 
                columns={["id", "brand", "model", "license_plate", "vin_code","driver"]} 
            />

            <h2>Замовлення</h2>
            <DataTable 
                apiUrl="http://127.0.0.1:8000/api/cargo/" 
                columns={["id", "name", "weight", "customer", "additional_info","vehicle"]} 
            />
        </div>
    );
};

export default Tables;
