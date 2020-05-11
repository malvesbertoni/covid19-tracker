// ------------------------------------------------------------------------------------------------------------
// This component is responsible for creating and displaying the charts.
// There are two charts: a line chart for the global situation and a bar chart for the countries.
// If a country is selected in the 'CountryPicker', the bar chart will be displayed.
// If "Global" is selected in the 'CountryPicker', which is the default option,the line chart will be displayed.
// ------------------------------------------------------------------------------------------------------------

// Importing requirements
import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

// Chart function receives "data" and "country" as params
// "data" is de-structured into "confirmed" (aka "infected"), "recovered" and "deaths".
function Chart({ data: { confirmed, recovered, deaths }, country }) {
    const [dailyData, setDailyData] = useState([]);

    // The daily data, retrieved from fetchDailyData(), is used to build the line chart.
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    // The lineChart is built using the daily data.
    const lineChart = (
        dailyData.length
            ? (
                <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, 
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}
                />
            ) : null
    );

    // The barChart is built using the param's data.
    const barChart = (
        confirmed
            ? (
                <Bar 
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5',
                                'rgba(0, 255, 0, 0.5',
                                'rgba(255, 0, 0, 0.5',
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}`},
                    }}
                />
            ) : null
    );

    // If a country is passed as a param, the barChart is displayed,
    // otherwise, the default option, lineChart, is displayed.
    return(
        <div className={styles.container}>
            { country ? barChart : lineChart }
        </div>
    )
};

export default Chart;