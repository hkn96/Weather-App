import './App.css'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

function App() {
  const baseUrl =
    'http://api.weatherapi.com/v1/current.json?key=b26b2ad396a64e31adb202032212612&q=London&aqi=no'

  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(data => {
        setWeather(data.data)
        console.log(data.data)
      })
      .catch(err => err)
  }, [])

  const inputCity = e => {
    setCity(e.target.value)
  }

  const findCity = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=b26b2ad396a64e31adb202032212612&q=${city}&aqi=no`
      )
      .then(data => {
        setWeather(data.data)
      })
      .catch(err => err)
  }

  return (
    <div className='App'>
      {weather && (
        <div>
          <Weather>
            <h1>Weather App</h1>
            <City>
              <Input type='text' onChange={inputCity} />
              <Button onClick={findCity}>City</Button>
            </City>
            <h2>{weather.location.country}</h2>
            <h2>{weather.location.name}</h2>
            <h3>{weather.current.temp_c}</h3>
            <h3>feels like : {weather.current.feelslike_c}</h3>
            <img src={weather.current.condition.icon} alt='' srcset='' />
            <h4>{weather.current.condition.text}</h4>
          </Weather>
        </div>
      )}
    </div>
  )
}

const City = styled.div`
  color: 'red';
`

const Weather = styled.div`
  background: cadetblue;
  h2 {
    color: #ff9900;
  }
  h3 {
    color: white;
    font-size: 32px;
  }
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: red;
  color: white;
  border: 2px solid white;
`

const Input = styled.input`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 2rem;
  width: 11rem;
  color: black;
  border: 2px solid black;
`

export default App
