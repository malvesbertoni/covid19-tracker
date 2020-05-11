// Importing axios
import axios from 'axios';

// Loading the API url into this variable
const url = 'https://covid19.mathdro.id/api';

// fetchData() - Fetches the API
// If a country is passed as a parameter, it'll fetch that country's data
// Otherwise, it'll fetch the global data
// used on 'App.js'
export const fetchData = async (country) => {
    let changeableUrl = url;
    
    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

// Fetches the daily data to be used on the 'global chart'
// used on 'components/Chart/Chart.jsx'
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

// Fetches the countries supported by the API
// used on 'components/CountryPicker/CountryPicker.jsx'
export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}