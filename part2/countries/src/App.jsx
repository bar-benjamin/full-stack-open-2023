
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const api_key = import.meta.env.VITE_SOME_KEY;

  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})

  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      setAllCountries(response.data)
      setCountries(response.data)
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    async function fetchWeather(capital) {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: capital,
          APPID: api_key
        }
      })
      setWeather(response.data)
    }

    if (countries.length === 1) {
      fetchWeather(countries[0].capital[0])
    }
  }, [countries, api_key])

  const handleCountriesFilter = (event) => {
    const inputValue = event.target.value.toLowerCase();
    const filteredCountries = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(inputValue)
    );
    setCountries(filteredCountries);
  };

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
  
  return (
    <>
      find countries <input onChange={handleCountriesFilter}/>
      {countries.length > 10 ?
      <p>Too many matches, specify another filter</p> :
      countries.length !== 1 ?
      countries.map(country => <li key={country.name.common}>{country.name.common}</li>) :
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>capital {countries[0].capital}</p>
        <p>area {countries[0].area}</p>
        <b>languages:</b>
        <ul>
          {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].name.common} width="200px"/>
        <h2>Weather in {countries[0].capital[0]}</h2>
        <p>temperature: {weather && weather.main && weather.main.temp ? `${kelvinToCelsius(weather.main.temp)} Celsius` : null}</p>
        <img src={`https://openweathermap.org/img/wn/${weather && weather.weather && weather.weather[0] && weather.weather[0].icon ? weather.weather[0].icon : '04n'}.png`}  width="75px" />
        <p>wind: {weather && weather.wind && weather.wind.speed ? `${weather.wind.speed} m/s` : null}</p>
      </div>
      }
    </>
  )
}

export default App
