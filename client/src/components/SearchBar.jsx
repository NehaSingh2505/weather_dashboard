import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch, history = [] }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchCities = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        params: { namePrefix: query },
        headers: {
          'X-RapidAPI-Key': 'ef2a056d5amshacd383971128d71p16483ejsn93250defdd42',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });
      const cities = response.data.data.map(city => `${city.name}, ${city.countryCode}`);
      setSuggestions(cities);
    } catch (err) {
      console.error('Autocomplete error:', err);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCities(input);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const handleSelect = (city) => {
    setInput(city);
    setSuggestions([]);
    onSearch(city.split(',')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.split(',')[0]);
      setSuggestions([]);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center position-relative"
        style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}
      >
        <div className="d-flex w-100 gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 mt-1 shadow" style={{ zIndex: 10 }}>
            {suggestions.map((city, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(city)}
                style={{ cursor: 'pointer' }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Search History */}
      {Array.isArray(history) && history.length > 0 && (
        <div className="text-center mt-3">
          <h6 className="mb-2">Recent Searches</h6>
          {history.map((city, idx) => (
            <button
              key={idx}
              className="btn btn-light border rounded-pill px-3 mx-1 my-1"
              onClick={() => onSearch(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
