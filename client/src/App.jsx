import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("weatherHistory")) || [];
  });

  const getWeather = async (city) => {
    try {
      const res = await axios.get(`https://weather-dashboard-523z.onrender.com/weather?city=${city}`);

      const formattedData = {
        city: city,
        condition: res.data.condition,
        icon: res.data.icon,
        temperature: res.data.temperature,
        humidity: res.data.humidity,
        windSpeed: res.data.windSpeed
      };

      setWeather(formattedData);
      setError("");

      const updatedHistory = [city, ...history.filter(c => c !== city)].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));

    } catch (err) {
      setError("City not found or server error.");
      setWeather(null);
    }
  };

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>🌦️ Weather Dashboard</h1>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              style={{ cursor: 'pointer' }}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <SearchBar onSearch={getWeather} />
        </div>

        {history.length > 0 && (
          <div className="text-center mb-4">
            
            <h6 className="mb-2">Recent Searches</h6>
            {history.map((city, idx) => (
              <button
                key={idx}
                className="btn btn-outline-secondary btn-sm mx-1 mb-2"
                onClick={() => getWeather(city)}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {weather && (
          <div className="d-flex justify-content-center">
            <div className="col-md-6 col-lg-4">
              <WeatherCard data={weather} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
