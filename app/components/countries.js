'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
import getSymbolFromCurrency from 'currency-symbol-map'

export default function Countries(props) {
  const [selected, setSelected] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);


  useEffect(() => {
    if(selected) {
      console.log('selected', selected);
      getCountry(selected.name.common)
    }
  }, [selected]) 

  function handleChange(e) {
    setSelected(props.countries[e.target.value])
  }

  function getCountry(name) {
    axios.get(`https://api.api-ninjas.com/v1/country?name=${name}`, {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
      }
    })
    .then(res => {
      console.log('res', res.data[0]);
      setCountryInfo(res.data[0])
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <div className="country-list">
        <select className="countries" name="countries" onChange={handleChange} defaultValue={'Select a country'}>
          <option value="Select a country" disabled>Select a country</option>
          {props.countries.map((country, index) => (
            <option key={index} value={index}>
              {country.flag} {country.name.common}
            </option>
          ))}
        </select>
      </div>
      {countryInfo && (
        <div>
          <p className="info">{getSymbolFromCurrency(countryInfo.currency.code)} {countryInfo.gdp_per_capita.toLocaleString("en-US")}</p>
        </div>
      )}
    </>
  )
}