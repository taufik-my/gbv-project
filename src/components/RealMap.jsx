import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { AlertCircle, CheckCircle2, Droplet, Thermometer, Wind } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const normalIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const alertIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const StationPopup = ({ station, onPressureAdjust }) => {
  const [pressure, setPressure] = useState(station.currentPressure || 8.62);
  const [isAdjusted, setIsAdjusted] = useState(false);
  const [adjustedPressure, setAdjustedPressure] = useState(null);

  const handleAdjust = () => {
    setIsAdjusted(true);
    setAdjustedPressure(pressure);
    onPressureAdjust(station.name, pressure);
  };

  if (!station.hasAlert && !isAdjusted) {
    return (
      <div className="text-gray-900 p-2 min-w-[300px]">
        <h3 className="font-bold mb-2">{station.name}</h3>
        <div className="bg-gray-50 border border-gray-200 rounded p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Wind size={16} />
              <span className="text-gray-700">Pressure:</span>
              <span className="font-medium">{station.currentPressure.toFixed(2)} MPa</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet size={16} />
              <span className="text-gray-700">Flow:</span>
              <span className="font-medium">{station.flowRate} m³/H</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer size={16} />
              <span className="text-gray-700">Temp:</span>
              <span className="font-medium">{station.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind size={16} />
              <span className="text-gray-700">O₂:</span>
              <span className="font-medium">{station.oxygenLevel}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdjusted) {
    return (
      <div className="text-gray-900 p-2 min-w-[300px]">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="text-green-500" size={20} />
          <h3 className="font-bold text-lg">{station.name}</h3>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 size={16} />
            <span>Alert resolved</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-700 font-semibold">Current Pressure:</span>
            <span className="text-gray-600 ml-2">{adjustedPressure.toFixed(2)} MPa</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-gray-50 border border-gray-200 rounded p-3">
          <div className="flex items-center gap-2">
            <Droplet size={16} />
            <span className="text-gray-700">Flow:</span>
            <span className="font-medium">{station.flowRate} m³/H</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer size={16} />
            <span className="text-gray-700">Temp:</span>
            <span className="font-medium">{station.temperature}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={16} />
            <span className="text-gray-700">O₂:</span>
            <span className="font-medium">{station.oxygenLevel}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-900 p-2 min-w-[300px]">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="text-red-500" size={20} />
        <h3 className="font-bold text-lg">{station.name}</h3>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
        <div className="mb-2">
          <span className="text-red-700 font-semibold">Current Pressure:</span>
          <span className="text-red-600 ml-2">{station.currentPressure.toFixed(2)} MPa</span>
        </div>
        <div>
          <span className="text-green-700 font-semibold">Suggested Pressure:</span>
          <span className="text-green-600 ml-2">{station.suggestedPressure.toFixed(2)} MPa</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-gray-50 border border-gray-200 rounded p-3 mb-3">
        <div className="flex items-center gap-2">
          <Droplet size={16} />
          <span className="text-gray-700">Flow:</span>
          <span className="font-medium">{station.flowRate} m³/H</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer size={16} />
          <span className="text-gray-700">Temp:</span>
          <span className="font-medium">{station.temperature}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={16} />
          <span className="text-gray-700">O₂:</span>
          <span className="font-medium">{station.oxygenLevel}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Adjust Pressure (MPa)</label>
          <input
            type="number"
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
            step="0.01"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={handleAdjust}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Adjust Pressure
        </button>
      </div>
    </div>
  );
};

const RealMap = () => {
  const [stationStates, setStationStates] = useState([
    { 
      name: 'Murakami', 
      position: [35.7254, 140.3087], 
      hasAlert: true,
      currentPressure: 8.62,
      suggestedPressure: 6.55,
      flowRate: 689,
      temperature: 8.44,
      oxygenLevel: 0.00
    },
    { 
      name: 'Togane', 
      position: [35.5601, 140.3663], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 1193,
      temperature: 8.63,
      oxygenLevel: 0.00
    },
    { 
      name: 'Otaki', 
      position: [35.2888, 140.2469], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 474,
      temperature: 8.63,
      oxygenLevel: 0.00
    },
    { 
      name: 'Mobara', 
      position: [35.4287, 140.2874], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 1064,
      temperature: 8.44,
      oxygenLevel: 0.00
    },
    { 
      name: 'Anegasaki', 
      position: [35.4766, 140.0264], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 213,
      temperature: -2.13,
      oxygenLevel: 0.00
    },
    { 
      name: 'Futtsu', 
      position: [35.3084, 139.8569], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 172,
      temperature: 8.63,
      oxygenLevel: 0.00
    },
    { 
      name: 'Kisarazu', 
      position: [35.3747, 139.9269], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 464,
      temperature: 8.44,
      oxygenLevel: 0.00
    },
    { 
      name: 'Kimitsu', 
      position: [35.3280, 139.9021], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 199,
      temperature: -2.13,
      oxygenLevel: 0.00
    },
    { 
      name: 'Sodegaura', 
      position: [35.4308, 140.0242], 
      hasAlert: false, 
      currentPressure: 6.55,
      flowRate: 608,
      temperature: 8.63,
      oxygenLevel: 0.00
    }
  ]);

  const handlePressureAdjust = (stationName, newPressure) => {
    setStationStates(prevStates => 
      prevStates.map(station => 
        station.name === stationName
          ? { ...station, hasAlert: false, currentPressure: newPressure }
          : station
      )
    );
  };

  const pipelineConnections = [
    [stationStates[0].position, stationStates[1].position],
    [stationStates[1].position, stationStates[2].position],
    [stationStates[2].position, stationStates[3].position],
    [stationStates[3].position, stationStates[4].position],
    [stationStates[4].position, stationStates[5].position],
    [stationStates[5].position, stationStates[6].position],
    [stationStates[6].position, stationStates[7].position],
    [stationStates[7].position, stationStates[8].position],
  ];

  return (
    <MapContainer 
      center={[35.4437, 140.0837]}
      zoom={10}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {stationStates.map((station, index) => (
        <Marker 
          key={index} 
          position={station.position}
          icon={station.hasAlert ? alertIcon : normalIcon}
        >
          <Popup>
            <StationPopup 
              station={station} 
              onPressureAdjust={handlePressureAdjust}
            />
          </Popup>
        </Marker>
      ))}

      {pipelineConnections.map((positions, index) => (
        <Polyline
          key={index}
          positions={positions}
          color="#6366f1"
          weight={3}
          dashArray="10,15"
          opacity={0.9}
        />
      ))}
    </MapContainer>
  );
};

export default RealMap;