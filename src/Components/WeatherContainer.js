import React, {useState} from 'react';
import '../Styles/Weather.css'
import {FaSearchengin} from 'react-icons/fa'
import {WiDaySunny} from 'react-icons/wi'
import WeatherInfo from './WeatherInfo'


const WeatherContainer = () => {

    // API Key from Open Weather App
    const API_KEY = 'cba53b60412c7d6a4a79524a89032911';
    const [searchQuery, setSearchQuery] = useState('');

    // Weather Parameter object/state
    const [weatherData, setWeatherData] = useState({
        temp: null,
        humidity: null,
        desc: null,
        city: null,
        wind : null,
        country : null
    });

    // const urlForCityName = `api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}`
    const urlForZipCode = `https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},in&appid=${API_KEY}`

    // useState to check valid zipCode
    const [isValidZipCode, setIsValidZipCode] = useState(true);

    // Function called onClick by "input-search" to validate zipCode
    function updateSearchQuery(event) {
        let zipCode = event.target.value;
        let isValid = validateZipCode (zipCode);
        setSearchQuery(zipCode);

        if(isValid || zipCode === '' || isValid.length === 6) {
            setIsValidZipCode(true);
        } else {
            setIsValidZipCode(false);

        }

    }

    function validateZipCode(zipCode) {
        let regex = /[0-9]{6}/;
        return regex.test(zipCode);
    }


    //  Function to Extract data from OWM api
    function getWeatherData () {
        if(!isValidZipCode || searchQuery === '') {
            setIsValidZipCode(false);
            return;
        }

        fetch(urlForZipCode)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => setWeatherData({
            temp : convertToDegree(data.main.temp),
            humidity : data.main.humidity,
            desc : data.weather[0].main,
            city : data.name,
            wind :  data.wind.speed,
            country : data.sys.country
        }))
    }

    // Function to Convert Temp from Kelvin To *C
    function convertToDegree(temp) {
        return (temp - 273.15).toFixed(0);
    }

    return (
        <section className="weather-container">
            <header className="header-weather">
                <h1>Weather App <small style={{color:"red",letterSpacing:"15px"}} >India</small>  </h1>
                <div>
                    <input
                    placeholder="Enter Zip code"
                    className="input-search"
                    onChange={updateSearchQuery}
                    maxLength='6'
                    />
                    <button onClick={getWeatherData}>
                        <FaSearchengin size="25px" />
                    </button>
                </div>
            </header>

            <p className="error">{isValidZipCode ? '' : 'Invalid ZipCode' }</p>

            <section className="weather-info">
                    {weatherData.temp === null ? (
                        <p>No Weather data to Display <WiDaySunny size="100px" className="no-weather" /> </p>
                    ) : <WeatherInfo data={weatherData} />
                    }
            </section>
        </section>
    )
}

export default WeatherContainer;