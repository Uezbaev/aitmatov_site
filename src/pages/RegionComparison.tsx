// src/pages/RegionComparison.tsx
import React, { useState } from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import { agriculturalRegions, regionalCropComparison } from '../data/mockData';

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

const RegionComparison: React.FC = () => {
  const [selectedRegions, setSelectedRegions] = useState<number[]>([1, 2]); // Default: Чуйская область, Ошская область
  
  const toggleRegion = (regionId: number) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions(selectedRegions.filter(id => id !== regionId));
    } else {
      if (selectedRegions.length < 2) {
        setSelectedRegions([...selectedRegions, regionId]);
      } else {
        alert('Пожалуйста, выберите не более двух регионов для прямого сравнения.');
      }
    }
  };

  const selectedRegionData: Region[] = agriculturalRegions
    .filter(region => selectedRegions.includes(region.id));
  
  // Создаем данные для BarChart, фильтруя regionalCropComparison по выбранным регионам
  const productionComparisonData = regionalCropComparison.filter(d => 
    selectedRegionData.some(r => r.name === d.name)
  );

  // Ключи для BarChart: соответствуют заголовкам в regionalCropComparison (Fruits, Vegetables и т.д.)
  const barChartKeys = ['Fruits', 'Vegetables', 'Nuts', 'Grains'];

  // Максимальное производство и площадь для нормализации прогресс-баров
  const maxOverallProduction = Math.max(...agriculturalRegions.map(r => r.production));
  const maxOverallArea = Math.max(...agriculturalRegions.map(r => r.area));

  return (
    <div className="space-y-6 scale-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Сравнение регионов</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary text-sm">Экспорт сравнения</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-medium mb-4">Выберите регионы для сравнения (макс. 2 для прямого сравнения)</h2>
        <div className="flex flex-wrap gap-3">
          {agriculturalRegions.map(region => (
            <button
              key={region.id}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedRegions.includes(region.id)
                  ? 'bg-green-100 border-green-600 text-green-800'
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => toggleRegion(region.id)}
              disabled={selectedRegions.length >= 2 && !selectedRegions.includes(region.id)}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {selectedRegions.length === 0 ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
            <BarChart2 size={24} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Регион не выбран</h3>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            Пожалуйста, выберите хотя бы один регион выше, чтобы увидеть данные сравнения и аналитику.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedRegionData.map(region => (
                <div key={region.id} className="card p-4">
                  <h3 className="font-medium text-green-800">{region.name}</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Производство</span>
                        <span className="font-medium">{(region.production / 1000).toLocaleString()} тыс. тонн</span>
                      </div>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-600 rounded-full" 
                          style={{ width: `${(region.production / maxOverallProduction) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Площадь</span>
                        <span className="font-medium">{(region.area / 1000).toLocaleString()} тыс. гектаров</span>
                      </div>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-600 rounded-full" 
                          style={{ width: `${(region.area / maxOverallArea) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <span className="text-xs text-gray-600">Основные культуры</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {region.mainCrops.map((crop, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-xs">
                      <span className="text-gray-600">Тип почвы:</span> {region.soilType}
                    </div>
                    
                    <div className="text-xs">
                      <span className="text-gray-600">Климат:</span> {region.climate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <BarChart
              data={productionComparisonData}
              keys={barChartKeys} 
              title="Сравнение типов культур (тыс. тонн)"
              xAxisLabel="Регион"
              yAxisLabel="Производство"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedRegionData.map(region => (
              <PieChart
                key={region.id}
                data={region.cropDistribution}
                title={`${region.name} - Распределение культур (%)`}
              />
            ))}
          </div>

          {selectedRegions.length === 2 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-medium">Прямое сравнение</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <h3 className="font-medium text-green-800">{selectedRegionData[0].name}</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-xl font-semibold">
                          {(selectedRegionData[0].production / 1000).toLocaleString()} тыс. тонн
                        </p>
                        <p className="text-sm text-gray-600">Общее производство</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold">
                          {(selectedRegionData[0].area / 1000).toLocaleString()} тыс. гектаров
                        </p>
                        <p className="text-sm text-gray-600">Обрабатываемая площадь</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold">
                          {selectedRegionData[0].area > 0 ? (selectedRegionData[0].production / selectedRegionData[0].area).toFixed(2) : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">Урожайность (тонн/гектар)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ArrowRight size={32} className="text-gray-400" />
                    <div className="text-sm text-gray-500 mt-2">vs.</div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-medium text-green-800">{selectedRegionData[1].name}</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-xl font-semibold">
                          {(selectedRegionData[1].production / 1000).toLocaleString()} тыс. тонн
                        </p>
                        <p className="text-sm text-gray-600">Общее производство</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold">
                          {(selectedRegionData[1].area / 1000).toLocaleString()} тыс. гектаров
                        </p>
                        <p className="text-sm text-gray-600">Обрабатываемая площадь</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold">
                          {selectedRegionData[1].area > 0 ? (selectedRegionData[1].production / selectedRegionData[1].area).toFixed(2) : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">Урожайность (тонн/гектар)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Ключевые различия</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                        <span className="text-xs">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Специализация на культурах</p>
                        <p className="text-sm text-gray-600">
                          {selectedRegionData[0].name} специализируется на {selectedRegionData[0].mainCrops.join(' и ')}, 
                          в то время как {selectedRegionData[1].name} фокусируется на {selectedRegionData[1].mainCrops.join(' и ')}.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                        <span className="text-xs">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Условия выращивания</p>
                        <p className="text-sm text-gray-600">
                          {selectedRegionData[0].name} имеет {selectedRegionData[0].climate} климат с {selectedRegionData[0].soilType} почвой, 
                          по сравнению с {selectedRegionData[1].name} {selectedRegionData[1].climate} климатом и {selectedRegionData[1].soilType} почвой.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RegionComparison;