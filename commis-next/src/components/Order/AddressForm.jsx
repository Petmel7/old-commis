
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getRegions, getCities, getPostOffices } from '../../services/novaposhtaService';
import styles from './styles/AddressForm.module.css';

const AddressForm = ({ onAddressSelected }) => {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [postOffices, setPostOffices] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedPostOffice, setSelectedPostOffice] = useState(null);

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            setRegions(regions.map(region => ({ value: region.Ref, label: region.Description })));
        };
        fetchRegions();
    }, []);

    const handleRegionChange = async (selectedOption) => {
        setSelectedRegion(selectedOption);
        setSelectedCity(null);
        setSelectedPostOffice(null);
        const cities = await getCities(selectedOption.value);
        setCities(cities.map(city => ({ value: city.Ref, label: city.Description })));
    };

    const handleCityChange = async (selectedOption) => {
        setSelectedCity(selectedOption);
        setSelectedPostOffice(null);
        const postOffices = await getPostOffices(selectedOption.value);
        setPostOffices(postOffices.map(postOffice => ({ value: postOffice.Ref, label: postOffice.Description })));
    };

    const handlePostOfficesChange = (selectedOption) => {
        setSelectedPostOffice(selectedOption);
    };

    useEffect(() => {
        if (selectedRegion && selectedCity && selectedPostOffice) {
            onAddressSelected({
                region: selectedRegion.label,
                city: selectedCity.label,
                post_office: selectedPostOffice.label,
            });
        }
    }, [selectedRegion, selectedCity, selectedPostOffice]);

    return (
        <form className={styles.addressForm}>
            <Select
                className={styles.select}
                value={selectedRegion}
                onChange={handleRegionChange}
                options={regions}
                placeholder="Виберіть область"
            />
            <Select
                className={styles.select}
                value={selectedCity}
                onChange={handleCityChange}
                options={cities}
                placeholder="Виберіть місто"
                isDisabled={!selectedRegion}
            />
            <Select
                className={styles.select}
                value={selectedPostOffice}
                onChange={handlePostOfficesChange}
                options={postOffices}
                placeholder="Виберіть відділення"
                isDisabled={!selectedCity}
            />
        </form>
    );
};

export default AddressForm;
