import React, { useState, useEffect } from "react"
import axios from "axios"


const API_KEY = process.env.REACT_APP_API_KEY

const renderCountryList = (countries, singleCountrySelect) => {
  return (
    <ul>
      {countries.map(country =>
        <CountryListLine key={country.name.common} country={country} singleCountrySelect={singleCountrySelect} />
      )}
    </ul>
  )
}

const renderSingleCountry = (country) => {
  return (
    <CountryDetailedView country={country} />
  )
}

const Countries = ({ countries, country, singleCountrySelect }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify filter</div>
  }
  else if (countries.length > 1) {
    if (Object.keys(country).length === 0) { // No button selected single country
      return renderCountryList(countries, singleCountrySelect)
    }
    else {
      return renderSingleCountry(country) // Button selected single country
    }
  }
  else if (countries.length === 1) {
    return renderSingleCountry(countries[0]) 
  }
  else {
    return null // Cover first time component render when the useEffect hook in App is not yet fired
  }
}
  
const CountryListLine = ({ country, singleCountrySelect }) => {
  return (
    <li>
      {country.name.common}
      <button onClick={() => {
        singleCountrySelect(country)
      }}> 
        show
      </button>
    </li>
  )
}

const CountryDetailedView = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: API_KEY,
          query: country.capital[0]
        }
      })
      .then(response => {
        setWeather(response.data)
      })
  }, [country])

  if (Object.keys(weather).length !== 0) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          Capital: {country.capital}
          <br></br>
          Population: {country.population}
        </p>
        <h3>Spoken languages</h3>
        <ul>
          {Object.keys(country.languages).map(key =>
            <li key={key}>
              {country.languages[key]}
            </li>
          )}
        </ul>
        <img
          id={country.name.common}
          src={country.flags.png}
          alt="country flag"
        />
        <Weather weather={weather} />
      </div>
    )
    }
  else {
    return null // Cover first time component render when the useEffect hook is not yet fired
  }
}

const Weather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p>Temperature: {weather.current.temperature} Celsius</p>
      <img
        id={weather.location.name}
        src={weather.current.weather_icons}
        alt="current weather"
      />
      <p>Wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Countries
