import React, { useState, useEffect } from 'react';
import { AlertCircle, CloudRain, Power, ThumbsUp, ThumbsDown, Clock, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RealMap from './RealMap';

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <Clock className="mr-2" /> Date & Time
      </h2>
      <div className="text-xl font-bold">
        {date.toLocaleTimeString()}
      </div>
      <div className="text-gray-400">
        {date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
};

const WeatherWidget = () => {
  const forecast = [
    { day: 'Today', temp: '24°C', condition: 'Sunny' },
    { day: 'Tomorrow', temp: '22°C', condition: 'Cloudy' },
    { day: 'Friday', temp: '23°C', condition: 'Partly Cloudy' }
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <CloudRain className="mr-2" /> Weather
      </h2>
      <div className="space-y-4">
        {/* Current Weather */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Temperature</span>
            <span>24°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Humidity</span>
            <span>65%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Wind</span>
            <span>12 km/h</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Pressure</span>
            <span>1013 hPa</span>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="border-t border-gray-700 pt-3">
          <h3 className="text-sm font-semibold mb-2">Forecast</h3>
          <div className="grid grid-cols-3 gap-2">
            {forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-400">{day.day}</div>
                <div className="text-sm font-medium">{day.temp}</div>
                <div className="text-xs">{day.condition}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GasBalanceChart = () => {
  const data = [
    { time: '00:00', actual: 4000, forecast: 4100 },
    { time: '04:00', actual: 3500, forecast: 3800 },
    { time: '08:00', actual: 4500, forecast: 4300 },
    { time: '12:00', actual: 4200, forecast: 4400 },
    { time: '16:00', actual: 4800, forecast: 4600 },
    { time: '20:00', actual: 4100, forecast: 4200 },
    { time: '24:00', actual: 3900, forecast: 4000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="time" stroke="#999" />
        <YAxis stroke="#999" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
          labelStyle={{ color: '#999' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#3b82f6" 
          name="Actual"
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="forecast" 
          stroke="#10b981" 
          name="Forecast"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CompressorStatusCard = ({ name, status }) => {
  return (
    <div className="bg-gray-700 p-2 rounded">
      <div className="text-sm font-semibold mb-1">{name}</div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex items-center text-sm">
          <Power className="w-3 h-3 mr-1" />
          <span>{status.power}</span>
        </div>
        <div className="flex items-center text-sm">
          <ThumbsUp className="w-3 h-3 mr-1" />
          <span>{status.alerts}</span>
        </div>
        <div className="flex items-center text-sm">
          <ThumbsDown className="w-3 h-3 mr-1" />
          <span>{status.down}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const compressors = [
    { name: '村上(Murakami)', status: { power: 0, alerts: 0, down: 0 } },
    { name: '東金市(Togane)', status: { power: 1, alerts: 0, down: 0 } },
    { name: '大多喜(Otaki)', status: { power: 1, alerts: 1, down: 0 } },
    { name: '茂原(Mobara)', status: { power: 2, alerts: 0, down: 1 } },
    { name: '姉崎(Anegasaki)', status: { power: 0, alerts: 1, down: 0 } },
    { name: '富津(Futtsu)', status: { power: 1, alerts: 2, down: 2 } },
    { name: '木更津(Kisarazu)', status: { power: 1, alerts: 0, down: 0 } },
    { name: '君津(Kimitsu)', status: { power: 0, alerts: 1, down: 1 } },
    { name: '袖ケ浦(Sodegaura)', status: { power: 2, alerts: 1, down: 0 } }
  ];

  const alarmTypes = [
    { name: 'TOTAL', high: 2, medium: 1, low: 0 },
    { name: 'Pressure', high: 1, medium: 0, low: 0 },
    { name: 'Flow', high: 0, medium: 0, low: 0 },
    { name: 'Gas Quality', high: 1, medium: 0, low: 0 },
    { name: 'Valve', high: 0, medium: 1, low: 0 }
  ];

  const alerts = [
    { 
      id: 1, 
      type: 'High', 
      message: (
        <span>
          Pressure exceeds threshold at Compressor <span className="text-yellow-300 font-bold">Murakami</span> - Current: 
          <span className="text-red-400 font-bold">8.62</span> MPa, Suggested: 
          <span className="text-green-400 font-bold">6.55</span> PSI
        </span>
      ), 
      timestamp: '10:45:23',
      location: 'Murakami'
    },
    { 
      id: 2, 
      type: 'Medium', 
      message: (
        <span>
          Flow rate fluctuation detected at Compressor <span className="text-yellow-300 font-bold">Togane</span>
        </span>
      ), 
      timestamp: '10:42:15',
      location: 'Togane'
    },
    { 
      id: 3, 
      type: 'Low', 
      message: (
        <span>
          Valve position warning at Compressor <span className="text-yellow-300 font-bold">Otaki</span>
        </span>
      ), 
      timestamp: '10:40:00',
      location: 'Otaki'
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 h-screen min-w-[1280px]">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-4">
          <DateTime />
          <WeatherWidget />
          
          {/* Alarms Summary */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Bell className="mr-2" /> Alarms Summary
            </h2>
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left pb-2"></th>
                  <th className="text-center pb-2">High</th>
                  <th className="text-center pb-2">Medium</th>
                  <th className="text-center pb-2">Low</th>
                </tr>
              </thead>
              <tbody>
                {alarmTypes.map((type, index) => (
                  <tr key={index} className={index === 0 ? 'font-bold' : ''}>
                    <td className="py-1">{type.name}</td>
                    <td className="text-center">
                      <span className="inline-block w-6 h-6 rounded bg-red-500 text-center">
                        {type.high}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="inline-block w-6 h-6 rounded bg-yellow-500 text-center">
                        {type.medium}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="inline-block w-6 h-6 rounded bg-green-500 text-center">
                        {type.low}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Current Alerts */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <AlertCircle className="mr-2" />
              Current Alerts
            </h2>
            <div className="bg-gray-700/30 rounded-lg p-3">
              <div className="space-y-2 overflow-y-auto h-48">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-2 bg-gray-600/50 p-2 rounded">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getAlertColor(alert.type)}`} />
                    <div className="flex-1">
                      <div className="text-sm leading-tight">{alert.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{alert.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Map and Bottom Section */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 bg-gray-800 p-4 rounded-lg">
            <RealMap />
          </div>
          
          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-4 h-80">
            {/* Gas Balance Chart */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Gas Balance Forecast</h2>
              <div className="h-64">
                <GasBalanceChart />
              </div>
            </div>

            {/* Compressor Status Summary */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Compressor Status Summary</h2>
              <div className="h-64 grid grid-cols-5 gap-2 overflow-y-auto">
                {compressors.map((compressor, index) => (
                  <CompressorStatusCard 
                    key={index}
                    name={compressor.name}
                    status={compressor.status}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;