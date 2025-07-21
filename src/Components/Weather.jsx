import React, { useState, useEffect } from 'react';
import './Weather.css';
import axios from 'axios';

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState(null);

  // Try geolocation on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
      }
    );
  }, []);

  // Fetch weather on coordinates update
  useEffect(() => {
    if (coords) {
      fetchWeatherByCoords(coords.lat, coords.lon);
    }
  }, [coords]);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=wF7tUNPxg5np4B5Qc5cGQdh7XhaDPNE7`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

const fetchWeatherByLocation = async () => {
  if (!location.trim()) return;

  try {
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=wF7tUNPxg5np4B5Qc5cGQdh7XhaDPNE7`;
    const response = await axios.get(url);
    setData(response.data);
    setDisplayName(location); // Set location that user typed
  } catch (error) {
    console.error('Weather fetch error:', error);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherByLocation();
    }
  };

  const getWeatherType = (code) => {
    if (!code) return 'Clear';
    if (code === 1000) return 'Clear';
    if ([1100, 1101, 1102, 1001].includes(code)) return 'Cloudy';
    if ([2000, 2100].includes(code)) return 'Haze';
    if ([4000, 4001, 4200, 4201].includes(code)) return 'Rain';
    if ([5000, 5001, 5100, 5101].includes(code)) return 'Snow';
    if ([6000, 6001, 6200, 6201].includes(code)) return 'Haze';
    if (code === 8000) return 'Thunderstorm';
    return 'Unknown';
  };

  const getWeatherIcon = (type) => {
    switch (type) {
      case 'Clear':
        return <i className='bx bxs-sun'></i>;
      case 'Cloudy':
        return <i className='bx bxs-cloud'></i>;
      case 'Rain':
        return <i className='bx bxs-cloud-rain'></i>;
      case 'Thunderstorm':
        return <i className='bx bxs-cloud-lightning'></i>;
      case 'Snow':
        return <i className='bx bxs-cloud-snow'></i>;
      case 'Haze':
        return <i className='bx bxs-cloud-haze'></i>;
      default:
        return <i className='bx bxs-cloud'></i>;
    }
  };

  const weatherCode = data?.data?.values?.weatherCode;
  const weatherType = getWeatherType(weatherCode);
  const temperature = data?.data?.values?.temperature;
  const feelsLike = data?.data?.values?.temperatureApparent;
 
  const [displayName, setDisplayName] = useState('');


  return (
    <div className={`weather ${weatherType.toLowerCase()}`}>
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot" onClick={fetchWeatherByLocation}></i>
          <div className="location">{displayName || 'Your Location'}</div>

        </div>

        <div className="search-location">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={fetchWeatherByLocation}></i>
        </div>
      </div>

      {data && (
        <div className="weather-data">
          {getWeatherIcon(weatherType)}
          <div className="weather-type">{weatherType}</div>
          <div className="temp">
            {temperature ? `${Math.round(temperature)}°` : 'N/A'}
            <small> (Feels like {Math.round(feelsLike)}°)</small>
          </div>

        

        </div>
      )}
    </div>
  );
};

export default Weather;
