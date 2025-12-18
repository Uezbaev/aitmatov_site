// src/pages/MapView.tsx
import React, { useState } from 'react';
import { Filter, Download, Layers } from 'lucide-react';
import MapComponent from '../components/maps/MapComponent';
import { agriculturalRegions } from '../data/mockData';

interface Region {
  id: number;
  name: string;
  coordinates: [number, number];
  mainCrops: string[];
  production: number;
  area: number;
  growingSeason: string;
  climate: string;
  soilType: string;
  irrigationSystem: string;
  challenges: string[];
  yearlyProduction: { year: string; production: number }[];
  cropDistribution: { name: string; value: number }[];
}

const MapView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [filter, setFilter] = useState('all');

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
  };

  // Максимальное значение производства для нормализации высоты столбцов
  const maxProduction = Math.max(...agriculturalRegions.map(r => Math.max(...r.yearlyProduction.map(yp => yp.production))));

  return (
    <div className="space-y-6 scale-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Сельскохозяйственная карта</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              className="select text-sm pl-9"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Все культуры</option>
              <option value="Пшеница">Пшеница</option>
              <option value="Кукуруза">Кукуруза</option>
              <option value="Картофель">Картофель</option>
              <option value="Фрукты">Фрукты</option>
              <option value="Овощи">Овощи</option>
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <button className="btn btn-primary text-sm flex items-center space-x-1">
            <Download size={16} />
            <span>Экспорт</span>
          </button>
          
          <button className="btn btn-outline text-sm flex items-center space-x-1">
            <Layers size={16} />
            <span>Слои</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapComponent 
            selectedRegionId={selectedRegion?.id}
            onRegionSelect={handleRegionSelect}
            regions={agriculturalRegions} 
          />
        </div>
        
        <div className="lg:col-span-1">
          <div className="card h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold">Детали региона</h2>
            </div>
            
            {selectedRegion ? (
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-green-800">{selectedRegion.name}</h3>
                  <p className="text-gray-600">Сельскохозяйственный производственный регион</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-gray-600 text-sm">Производство</p>
                    <p className="font-semibold text-lg">{(selectedRegion.production / 1000).toLocaleString()} тыс. тонн</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-gray-600 text-sm">Площадь</p>
                    <p className="font-semibold text-lg">{(selectedRegion.area / 1000).toLocaleString()} тыс. гектаров</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Основные культуры</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedRegion.mainCrops.map((crop, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Климат & Почва</h4>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm"><span className="font-medium">Климат:</span> {selectedRegion.climate}</p>
                      <p className="text-sm"><span className="font-medium">Тип почвы:</span> {selectedRegion.soilType}</p>
                      <p className="text-sm"><span className="font-medium">Сезон роста:</span> {selectedRegion.growingSeason}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Сельхоз практика</h4>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm"><span className="font-medium">Ирригация:</span> {selectedRegion.irrigationSystem}</p>
                      <p className="text-sm"><span className="font-medium">Сложности:</span> {selectedRegion.challenges.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Тенденция произ/ва</h4>
                    <div className="mt-2 flex items-end justify-around space-x-1 h-24"> {/* Увеличил высоту для лучшего отображения */}
                      {selectedRegion.yearlyProduction.map((year, i, arr) => {
                        const isIncrease = i > 0 && year.production > arr[i-1].production;
                        const barHeight = (year.production / maxProduction) * 100; // Нормализованная высота

                        return (
                          <div key={year.year} className="flex flex-col items-center">
                            <span className="text-xs">{year.year}</span>
                            <div 
                              className={`w-10 relative flex items-end rounded ${i === arr.length - 1 ? 'bg-green-100' : 'bg-gray-100'}`}
                              style={{ height: 'calc(100% - 1.5rem)' }} // Высота контейнера для столбца (24px = 1.5rem для текста года)
                            >
                              <div 
                                className={`w-full ${i === arr.length - 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-t`}
                                style={{ 
                                  height: `${barHeight}%`, 
                                  minHeight: '10%', // Минимальная высота для видимости
                                }}
                              ></div>
                            </div>
                            {i > 0 && (
                              <div className={`text-xs ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                                {isIncrease ? '↗' : '↘'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <button className="btn btn-primary w-full mt-4">Просмотр подробной аналитики</button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                <div className="bg-gray-100 rounded-full p-4 mb-4">
                  <Layers size={24} className="text-gray-500" /> 
                </div>
                <h3 className="text-lg font-medium text-gray-800">Выбрать регион</h3>
                <p className="text-gray-600 mt-2">Нажмите на регион на карте для просмотра данных и аналитики.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;