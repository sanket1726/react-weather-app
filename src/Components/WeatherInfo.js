// Component Used To Display Weather Data

import React from 'react';
import '../Styles/Weather.css'
// import {FaCloudSun, FaCloudSunRain} from 'react-icons/fa'
import {WiDegrees, WiCloudy, WiFog, WiDaySunny, WiTornado, WiRain} from 'react-icons/wi'
import { GiPaperWindmill } from 'react-icons/gi';


function WeatherInfo(props) {
    const {temp, humidity, desc, city, wind, country} = props.data;
    return (
        <React.Fragment>

            <p className="weather-desc"> {desc}
                {desc === "Clouds" ? <WiCloudy size="90px" /> :
                desc=== "Haze" ? <WiFog size="80px" /> :
                desc==="Rain" ? <WiRain/>
                : <WiDaySunny size="80px" style={{color:"yellow"}} className="no-weather" /> } </p>

            <section className="weather-data-flex">

            <div className="weather-info-header">
            <h4>City</h4>
            <p> {city} <small style={{fontWeight:"600"}} >({country})</small> </p>
            </div>

            <div className="weather-info-header">
            <h4>Temperature</h4>
            <p> {temp} <WiDegrees size="60px" className="logos" />C</p>
            </div>

            <div className="weather-info-header">
            <h4> Humidity</h4>
            <p> {humidity} % </p>
            </div>

            <div className="weather-info-header">
            <h4> Wind Speed</h4>
            <p> {wind} {wind > 10.5 ? <WiTornado/> : <GiPaperWindmill/> } </p>
            </div>

            </section>
        </React.Fragment>
    )
}

export default WeatherInfo