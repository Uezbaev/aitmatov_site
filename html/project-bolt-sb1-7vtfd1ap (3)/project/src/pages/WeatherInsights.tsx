import React, { useState } from 'react';
import { Cloud, CloudRain, Thermometer, Wind, Calendar } from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import { weatherImpactData } from '../data/mockData';

const WeatherInsights: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("Central Valley, CA");
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  
  return (
    <div className="space-y-6 scale-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Прогноз погоды</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              className="select text-sm pl-9"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option>Иссык-Куль</option>
              <option>Чуй</option>
              <option>Джалал-Абад</option>
              <option>Нарын</option>
              <option>Ош</option>
            </select>
            <Cloud size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <div className="relative">
            <select 
              className="select text-sm pl-9"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
            <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <Thermometer size={20} />
            </div>
            <h3 className="font-medium">Температура</h3>
          </div>
          <div className="text-3xl font-semibold">68°F</div>
          <p className="text-gray-600 text-sm mt-1">Среднее значение {selectedYear}</p>
          
          <div className="flex items-center mt-3 text-sm">
            <span className="text-green-600">+2.1°F</span>
            <span className="text-gray-500 ml-2">от исторического среднего</span>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <CloudRain size={20} />
            </div>
            <h3 className="font-medium">Осадки</h3>
          </div>
          <div className="text-3xl font-semibold">32"</div>
          <p className="text-gray-600 text-sm mt-1">Общее для {selectedYear}</p>
          
          <div className="flex items-center mt-3 text-sm">
            <span className="text-red-600">-3.4"</span>
            <span className="text-gray-500 ml-2">от исторического среднего</span>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <Wind size={20} />
            </div>
            <h3 className="font-medium">Дни роста</h3>
          </div>
          <div className="text-3xl font-semibold">245</div>
          <p className="text-gray-600 text-sm mt-1">Days in {selectedYear}</p>
          
          <div className="flex items-center mt-3 text-sm">
            <span className="text-green-600">+12 days</span>
            <span className="text-gray-500 ml-2">от исторического среднего</span>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <Cloud size={20} />
            </div>
            <h3 className="font-medium">Влажность</h3>
          </div>
          <div className="text-3xl font-semibold">58%</div>
          <p className="text-gray-600 text-sm mt-1">Среднее значение {selectedYear}</p>
          
          <div className="flex items-center mt-3 text-sm">
            <span className="text-red-600">-2%</span>
            <span className="text-gray-500 ml-2">от исторического среденего</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={weatherImpactData}
          keys={['Температура', 'Осадки']}
          title="Корреляция температуры и осадков"
          xAxisLabel="Месяц"
          yAxisLabel="Измерение"
        />
        
        <LineChart
          data={weatherImpactData}
          keys={['YieldIndex']}
          title="Влияние на индекс урожайности"
          xAxisLabel="Месяц"
          yAxisLabel="Индекс урожайности"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-medium">Сезонные погодные условия для {selectedRegion}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <h3 className="font-medium text-green-800 mb-2">Весна</h3>
              <div className="flex justify-center mb-3">
                <CloudRain size={32} className="text-blue-600" />
              </div>
              <p className="text-sm">Температура: 55-68°F</p>
              <p className="text-sm">Осадки: 8-12 inches</p>
              <p className="text-sm">Условия выращивания: Good</p>
              <p className="mt-3 text-xs text-gray-600">Идеально подходит для ранней посадки и прорастания</p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <h3 className="font-medium text-amber-800 mb-2">Лето</h3>
              <div className="flex justify-center mb-3">
                <Thermometer size={32} className="text-amber-600" />
              </div>
              <p className="text-sm">Температура: 75-95°F</p>
              <p className="text-sm">Осадки: 3-7 inches</p>
              <p className="text-sm">Условия выращивания: Прекрасные</p>
              <p className="mt-3 text-xs text-gray-600">Пиковый вегетационный период с потребностью в орошении</p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <h3 className="font-medium text-amber-800 mb-2">Осень</h3>
              <div className="flex justify-center mb-3">
                <Wind size={32} className="text-amber-600" />
              </div>
              <p className="text-sm">Температура: 58-75°F</p>
              <p className="text-sm">Осадки: 5-9 inches</p>
              <p className="text-sm">Условия выращивания: Хорошие</p>
              <p className="mt-3 text-xs text-gray-600">Сезон сбора урожая с изменчивыми условиями</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <h3 className="font-medium text-blue-800 mb-2">Зима</h3>
              <div className="flex justify-center mb-3">
                <Cloud size={32} className="text-blue-600" />
              </div>
              <p className="text-sm">Температура: 35-50°F</p>
              <p className="text-sm">Осадки: 10-15 inches</p>
              <p className="text-sm">Условия выращивания: Ограниченные</p>
              <p className="mt-3 text-xs text-gray-600">Подготовка полей и озимые культуры</p>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-4">Анализ воздействия погоды</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                  <span className="text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium">Температурные тенденции</p>
                  <p className="text-sm text-gray-600">
                    Средние температуры в {selectedRegion} увеличились на 2,1°F за последнее десятилетие, что продлило вегетационный период примерно на 12 дней,
                    но также увеличило потребность в орошении.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                  <span className="text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium">Характер осадков</p>
                  <p className="text-sm text-gray-600">
                    Осадки стали более изменчивыми, на 15% увеличилось количество экстремальных ливней, а между штормами стали более продолжительными засушливые периоды, что создает проблемы для стабильного развития сельскохозяйственных культур.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                  <span className="text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium">Корреляция урожайности</p>
                  <p className="text-sm text-gray-600">
                    Статистический анализ показывает, что оптимальная урожайность в {selectedRegion} достигаются, когда средние

температуры остаются в пределах 65-75°F во время ключевых стадий роста при постоянном наличии влаги.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                  <span className="text-xs">4</span>
                </div>
                <div>
                  <p className="font-medium">Стратегии адаптации</p>
                  <p className="text-sm text-gray-600">
                    Фермеры в этом регионе все чаще переходят на засухоустойчивые сорта сельскохозяйственных культур, повышают эффективность орошения и корректируют графики посадки, чтобы смягчить изменчивость погодных условий.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;