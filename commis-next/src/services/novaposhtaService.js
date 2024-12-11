import axios from 'axios';

const API_KEY = '7117ddde34fbe00bfdd633721af85e80';
export const getRegions = async () => {
    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        "apiKey": API_KEY,
        "modelName": "Address",
        "calledMethod": "getAreas",
        "methodProperties": {}
    });
    return response.data.data;
};

export const getCities = async (areaRef) => {
    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        "apiKey": API_KEY,
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": {
            "AreaRef": areaRef
        }
    });
    return response.data.data;
};

export const getPostOffices = async (cityRef) => {
    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        "apiKey": API_KEY,
        "modelName": "AddressGeneral",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityRef": cityRef
        }
    });
    return response.data.data;
};
