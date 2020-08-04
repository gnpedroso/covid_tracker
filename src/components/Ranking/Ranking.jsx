import React, { useState, useEffect } from 'react';
import axios from 'axios'

import styles from './Ranking.module.css'

export default function Ranking() {

    const [dataCountries, setDataCountries] = useState({})

    const getCountryData = async () => {

        try {
            const data = axios.get('https://disease.sh/v3/covid-19/countries')

            return data
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchAPI = async () => {
            setDataCountries(await getCountryData())
        }

        fetchAPI();
    }, [])

    const countryData = dataCountries.data

    console.log(countryData)

    return (

        !countryData ? 'Loading...' :
            <div>
                <h1>Top 20 Most Infected Countries</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Infected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countryData
                            .sort((a, b) => b.cases - a.cases)
                            .map((data, i) =>
                                <tr key={i}>
                                    <td>{data.country}</td>
                                    <td>{data.cases}</td>
                                </tr>)
                            .slice(0, 20)
                        }
                    </tbody>

                </table>

            </div>
    )
}
