import React, { useState, useEffect } from 'react';
import { CloudRain } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;  
  // Mobara coordinates
  const LATITUDE = 35.4287;
  const LONGITUDE = 140.2874;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        setWeather(currentData);
        
        // Get next 3 days forecast
        const dailyForecasts = forecastData.list
          .filter((item, index) => index % 8 === 0)
          .slice(0, 3);

        setForecast(dailyForecasts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherCondition = (weather) => {
    const id = weather?.weather[0]?.id;
    if (id >= 200 && id < 300) return 'Storm';
    if (id >= 300 && id < 500) return 'Drizzle';
    if (id >= 500 && id < 600) return 'Rain';
    if (id >= 600 && id < 700) return 'Snow';
    if (id === 800) return 'Clear';
    if (id > 800) return 'Clouds';
    return '';
  };

  if (loading || !weather) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <CloudRain className="mr-2" /> Weather
        </h2>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <CloudRain className="mr-2" /> Weather
      </h2>
      
      {/* Current Weather - Matching dashboard style */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Temperature</span>
            <span>{Math.round(weather.main.temp)}°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Humidity</span>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Wind</span>
            <span>{Math.round(weather.wind.speed * 3.6)} km/h</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Pressure</span>
            <span>{weather.main.pressure} hPa</span>
          </div>
        </div>

        {/* Forecast - Matching dashboard style */}
        <div className="border-t border-gray-700 pt-3">
          <h3 className="text-sm font-semibold mb-2">Forecast</h3>
          <div className="grid grid-cols-3 gap-2">
            {forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-400">
                  {index === 0 ? 'Fri' : 
                   index === 1 ? 'Sat' : 'Sun'}
                </div>
                <div className="text-sm font-medium">
                  {Math.round(day.main.temp)}°C
                </div>
                <div className="text-xs">
                  {getWeatherCondition(day)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;