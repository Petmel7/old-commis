
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAreas, getCities, getWarehouses } from '../../services/novaposhtaService'; // Імпортуйте ваш сервіс
import styles from './styles/AddressForm.module.css';

const AddressForm = ({ onAddressSelected }) => {
    const [areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    useEffect(() => {
        const fetchAreas = async () => {
            const areas = await getAreas();
            setAreas(areas.map(area => ({ value: area.Ref, label: area.Description })));
        };
        fetchAreas();
    }, []);

    const handleAreaChange = async (selectedOption) => {
        setSelectedArea(selectedOption);
        setSelectedCity(null);
        setSelectedWarehouse(null);
        const cities = await getCities(selectedOption.value);
        setCities(cities.map(city => ({ value: city.Ref, label: city.Description })));
    };

    const handleCityChange = async (selectedOption) => {
        setSelectedCity(selectedOption);
        setSelectedWarehouse(null);
        const warehouses = await getWarehouses(selectedOption.value);
        setWarehouses(warehouses.map(warehouse => ({ value: warehouse.Ref, label: warehouse.Description })));
    };

    const handleWarehouseChange = (selectedOption) => {
        setSelectedWarehouse(selectedOption);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedArea && selectedCity && selectedWarehouse) {
            onAddressSelected({
                area: selectedArea.label,
                city: selectedCity.label,
                warehouse: selectedWarehouse.label,
            });
        }
    };

    return (
        <form className={styles.addressForm} onSubmit={handleSubmit}>

            <Select
                className={styles.select}
                value={selectedArea}
                onChange={handleAreaChange}
                options={areas}
                placeholder="Виберіть область"
            />

            <Select
                className={styles.select}
                value={selectedCity}
                onChange={handleCityChange}
                options={cities}
                placeholder="Виберіть місто"
                isDisabled={!selectedArea}
            />

            <Select
                className={styles.select}
                value={selectedWarehouse}
                onChange={handleWarehouseChange}
                options={warehouses}
                placeholder="Виберіть відділення"
                isDisabled={!selectedCity}
            />
        </form>
    );
};

export default AddressForm;

