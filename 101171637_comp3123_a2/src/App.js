import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const url = 'https://api.openweathermap.org/data/2.5/weather';
const my_api_key = 'a78422695dfb745105ee9ecb4b2c9392';

const fetchData = async (city) => {

    const { data } = await axios.get(url, {
        params: {
            q: city,
            units: 'metric',
            appid: my_api_key,
        }
    });

    return data;
}
const date = (d) => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

const App = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
    const search = async (press) => {

        if(press.key === 'Enter') {
            const data = await fetchData(query);

            setWeather(data);
            setQuery('');
        }
    }

    return (
        <div className="main-container">

            <input type="text"className="search"placeholder="Type the city (e.g. Toronto)"value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div className="weather-card">

                    <div className="name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </div>

                    <div className="date">{date(new Date())}</div>

                    <div className="temperature">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>

                    <img className="icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />

                    <div className="description">{weather.weather[0].description}</div>
                </div>
            )}
        </div>
    );
}

export default App;

