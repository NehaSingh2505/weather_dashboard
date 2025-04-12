const WeatherCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card mx-auto text-center shadow-sm border-0" style={{ maxWidth: '24rem' }}>
      <div className="card-body">
        <h3 className="card-title text-capitalize fw-bold mb-1">{data.city}</h3>
        <h6 className="text-muted mb-3">{data.condition}</h6>

        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="Weather Icon"
          className="mb-3"
          style={{ width: '90px', height: '90px' }}
        />

        <ul className="list-unstyled mb-0">
          <li className="mb-2">🌡️ <strong>Temperature:</strong> {data.temperature}°C</li>
          <li className="mb-2">💧 <strong>Humidity:</strong> {data.humidity}%</li>
          <li>💨 <strong>Wind Speed:</strong> {data.windSpeed} km/h</li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherCard;
