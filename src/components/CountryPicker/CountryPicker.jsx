// ------------------------------------------------------------------------------------------------
// This component is responsible for the drop-down country selector list. (aka CountryPicker) 
// It loads all the available countries from the API and populates the list with them.
// There are 100+ countries in this list, but the default option is "Global".
// Whenever a country is selected, it'll trigger a function, changing the chart and cards displayed.
// ------------------------------------------------------------------------------------------------

// Importing requirements
import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

function CountryPicker({ handleCountryChange }) {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);

    return(
        <FormControl>
            <NativeSelect default="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
};

export default CountryPicker;