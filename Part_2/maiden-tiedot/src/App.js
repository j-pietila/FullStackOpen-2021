import React, { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Countries from "./components/Countries"


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({})

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesShown = (searchFilter) => {
    let shownCountries = []

    if (searchFilter.length > 0) {
      shownCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
    }

    return shownCountries
  }

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)
    if (Object.keys(selectedCountry).length !== 0) {
      updateSelectedCountry({}) // Reset selected single country state when the filter value changes to re-render a listing of countries
    }
  }

  const updateSelectedCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <Filter filter={searchFilter} filterHandler={handleSearchFilter} />
      <Countries
        countries={countriesShown(searchFilter)}
        country={selectedCountry}
        singleCountrySelect={updateSelectedCountry}
      />
    </div>
  )
}

export default App
