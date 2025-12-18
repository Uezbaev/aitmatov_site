import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { agriculturalRegions } from '../../data/mockData';

interface Region {
  id: number;
  name: string;
  coordinates: [number, number];
  mainCrops: string[];
  production: number;
  area: number;
}

interface MapComponentProps {
  selectedRegionId?: number;
  onRegionSelect?: (region: Region) => void;
}

// Function to create custom markers
const createCustomMarker = (production: number) => {
  const size = Math.min(Math.max(Math.log(production) * 5, 25), 45);
  
  return divIcon({
    html: `<div style="
      background-color: rgba(45, 106, 79, 0.8);
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
    "></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
};

// Component to handle map events and state
const MapController: React.FC<{
  selectedRegionId?: number;
}> = ({ selectedRegionId }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedRegionId) {
      const region = agriculturalRegions.find(r => r.id === selectedRegionId);
      if (region) {
        map.flyTo(region.coordinates, 8, {
          duration: 1.5,
          easeLinearity: 0.25,
        });
      }
    }
  }, [selectedRegionId, map]);
  
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ 
  selectedRegionId,
  onRegionSelect 
}) => {
  const [regions] = useState<Region[]>(agriculturalRegions);
  
  return (
    <div className="map-container">
      <MapContainer
        center={[41.2044, 74.7661]} // United States center
        zoom={8}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedRegionId={selectedRegionId} />
        
        {regions.map((region) => (
          <Marker 
            key={region.id}
            position={region.coordinates}
            icon={createCustomMarker(region.production)}
            eventHandlers={{
              click: () => {
                if (onRegionSelect) {
                  onRegionSelect(region);
                }
              },
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium text-green-800">{region.name}</h3>
                <p className="text-sm text-gray-600">Основные культуры: {region.mainCrops.join(', ')}</p>
                <p className="text-sm">Продукция: {region.production.toLocaleString()} тонны</p>
                <p className="text-sm">Площадь: {region.area.toLocaleString()} acres</p>
                <button 
                  className="mt-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                  onClick={() => onRegionSelect && onRegionSelect(region)}
                >
                  Детали
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;