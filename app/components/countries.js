'use client'
import { useEffect, useState } from "react";

export default function Countries(props) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleChange(e) {
    console.log('test', props.data[e.target.value]);
    setSelectedCountry(props.data[e.target.value])
  }

  function getCountry() {
    axios.get('/api/customer')
    .then(res => {
      console.log('get list', res);
      setList(res.data.customers)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    console.log('selected updated', selectedCountry)

  }, [selectedCountry]) 

  return (

    <select className="countries" name="countries" onChange={handleChange} defaultValue={'Select a country'}>
      <option value="Select a country" disabled>Select a country</option>
      {props.data.map((country, index) => (
        <option key={index} value={index}>
          {country.flag} {country.name.common}
        </option>
      ))}

    </select>

  )
}