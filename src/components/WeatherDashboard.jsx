import React, { useState } from 'react';
import './WeatherDashboard.css';

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
// Pulling the secret key securely from our environment variables

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export default function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let [theme , setTheme] = useState("bright");
  
  const handleTheme = () => {
    if (theme === "bright")
    { setTheme ("dark")} else {
      setTheme( "bright")}  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page on form submit
    
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    // Reset layout states before sending the request
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await fetch(`${API_URL}?q=${trimmedCity}&appid=${API_KEY}&units=metric`);

      if (!response.ok) {
        setLoading(false);
        if (response.status === 404) {
          setError("City not found. Please check your spelling.");
        } else if (response.status === 429) {
          setError("API request limit exceeded. Try again later.");
        } else if (response.status === 401) {
          setError("Unauthorized. Please check your API key setup.");
        } else {
          setError(`An error occurred (${response.status}).`);
        }
        return;
      }

      const data = await response.json();
      setWeatherData(data);
      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError("Network failure. Please check your internet connection.");
    }
  };

  return (
    <div className={`container ${theme}`}>
      <header>
        <h2>Today's Weather...</h2>
        <button onClick={handleTheme} >Change the Theme</button>
      </header>
    <div className="weather-container">
      <h3>Dashboard, where you can search the weather of any city</h3>
      
      <form onSubmit={handleSearch} className="search-box">
        <input 
          type="text" 
          placeholder="Enter city name..." 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditionally Render Loading State */}
      {loading && (
        <div className="status-state">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {/* Conditionally Render Error State */}
      {error && <div className="error-box">{error}</div>}

      {/* Conditionally Render Success State */}
      {weatherData && !loading && !error && (
        <div className="weather-result">
          <h2>{weatherData.name}, {weatherData.sys?.country}</h2>
          <p><strong>Temperature:</strong> {Math.round(weatherData.main?.temp)}°C</p>
          <p><strong>Humidity:</strong> {weatherData.main?.humidity}%</p>
          <p><strong>Condition:</strong> {weatherData.weather[0]?.description}</p>
        </div>
      )}
    </div>
    <footer className="footer">
      <ul>
      <li><a href="https://alitek-03246155728.github.io/ContactUs/ContactUs.html">Contact Us</a></li>
      <li>Our Policy</li>
      <li>Help center</li>
      <li>Accounts</li>
      <li>FAQ</li>
      <li>Jobs</li>
      <li>Terms of Use</li>
      </ul>
    </footer>
    </div>
  );
}