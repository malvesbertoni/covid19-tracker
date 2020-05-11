// Importing requirements
import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import covid19 from './images/covid19.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  // Fetches data from the API
  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData })
  }

  // Receives specific data from the selected country
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    
    this.setState({ data: fetchedData, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={covid19} alt="covid19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;
