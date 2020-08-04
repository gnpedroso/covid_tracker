import React from 'react';

import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart';
import Ranking from './components/Ranking/Ranking';
import styles from './App.module.css';
import { fetchData } from './api';
import { fetchCountries } from './api';


export default class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() { 
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData })
       
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country })
    }


    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container} >
                <h1 className={styles.title}>COVID-19 TRACKER</h1>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country} />
                <Ranking data={data}/>
            </div>
        )
    }
}
