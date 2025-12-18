// src/pages/CropAnalytics.tsx
import React, { useState } from 'react';
import { BarChart2, Sprout, TrendingUp, SlidersHorizontal } from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { 
  cropProductionTrend, 
  regionalCropComparison, 
  agriculturalRegions,
  nationalCropDistribution, // <-- Добавлено
  dashboardStats // <-- Добавлено
} from '../data/mockData';

// Определяем соответствие между русскими названиями для UI и английскими ключами в данных
// Теперь используем ключи из вашего mockData.ts для cropProductionTrend
const CROP_NAMES_MAP: { [key: string]: string } = {
  "Кукуруза": "Corn",
  "Соя": "Soybeans", 
  "Пшеница": "Wheat",
  "Хлопок": "Cotton",
  "Фрукты": "Fruits", 
  "Овощи": "Vegetables",
  "Орехи": "Nuts", 
  "Зерна": "Grains", 
  "Ячмень": "Barley", // Добавил, если понадобится
  "Картофель": "Potato", // Добавил, если понадобится
};

// Используем только те культуры, которые есть в cropProductionTrend (или другие, которые вы хотите сравнивать)
const CROPS = ["Кукуруза", "Соя", "Пшеница", "Хлопок", "Фрукты", "Овощи", "Орехи", "Зерна", "Ячмень", "Картофель"]; 

const CropAnalytics: React.FC = () => {
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["Кукуруза", "Пшеница"]);
  const [timeRange, setTimeRange] = useState<string>("7y");

  const toggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter(c => c !== crop));
    } else {
      if (selectedCrops.length < 4) { // Ограничение на 4 выбранные культуры для графиков
        setSelectedCrops([...selectedCrops, crop]);
      } else {
        alert('Пожалуйста, выберите не более 4 культур для сравнения.');
      }
    }
  };

  // Пример данных по урожайности (предполагаем, что они используют английские ключи, как в mockData)
  // В вашем mockData нет отдельного yieldData, поэтому используем cropProductionTrend
  // для демонстрации. Если у вас есть другие данные по урожайности, используйте их.
  const yieldData = cropProductionTrend.map(item => ({
    name: item.name,
    Corn: item.Corn ? item.Corn * 0.1 : undefined, // Пример: перевод тонн в условные единицы урожайности
    Soybeans: item.Soybeans ? item.Soybeans * 0.12 : undefined,
    Wheat: item.Wheat ? item.Wheat * 0.08 : undefined,
    Cotton: item.Cotton ? item.Cotton * 0.05 : undefined,
  }));

  // Функция для фильтрации данных
  const getFilteredLineChartData = (rawData: any[], keysToMap: string[]) => {
    const dataKeys = selectedCrops
      .map(crop => keysToMap.includes(CROP_NAMES_MAP[crop]) ? CROP_NAMES_MAP[crop] : null)
      .filter(Boolean) as string[]; 

    return rawData.map(dataPoint => {
      const filtered: any = { name: dataPoint.name };
      dataKeys.forEach(key => {
        if (dataPoint.hasOwnProperty(key)) {
          filtered[key] = dataPoint[key];
        }
      });
      return filtered;
    });
  };

  // Ключи для LineChart для cropProductionTrend (английские)
  const lineChartProductionKeys = selectedCrops.map(crop => CROP_NAMES_MAP[crop]).filter(key => 
    ['Corn', 'Soybeans', 'Wheat', 'Cotton'].includes(key)
  );
  const filteredProductionData = getFilteredLineChartData(cropProductionTrend, ['Corn', 'Soybeans', 'Wheat', 'Cotton']);

  // Ключи для LineChart для yieldData (английские)
  const lineChartYieldKeys = selectedCrops.map(crop => CROP_NAMES_MAP[crop]).filter(key => 
    ['Corn', 'Soybeans', 'Wheat', 'Cotton'].includes(key)
  );
  const filteredYieldData = getFilteredLineChartData(yieldData, ['Corn', 'Soybeans', 'Wheat', 'Cotton']);

  // Ключи для BarChart: должны соответствовать названиям культур в regionalCropComparison (английские)
  const barChartKeys = selectedCrops.map(crop => CROP_NAMES_MAP[crop]).filter(key => 
    ['Fruits', 'Vegetables', 'Nuts', 'Grains'].includes(key)
  );

  // Для отображения ведущих регионов-производителей
  const topRegions = agriculturalRegions
    .sort((a, b) => b.production - a.production)
    .slice(0, 3);
  
  // Для отображения лучших культур по объему
  const topCropsByVolume = [...nationalCropDistribution]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return (
    <div className="space-y-6 scale-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Аналитика урожая</h1>
        <div className="flex space-x-2">
          <select 
            className="select text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="3y">Последние 3 года</option>
            <option value="5y">Последние 5 года</option>
            <option value="7y">Последние 7 года</option>
            <option value="10y">Последние 9 года</option>
          </select>
          <button className="btn btn-primary text-sm flex items-center space-x-1">
            <SlidersHorizontal size={16} />
            <span>Настроить</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-medium mb-4">Выберите урожай для сравнения</h2>
        <div className="flex flex-wrap gap-3">
          {CROPS.map(crop => (
            <button
              key={crop}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedCrops.includes(crop)
                  ? 'bg-green-100 border-green-600 text-green-800'
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => toggleCrop(crop)}
              disabled={selectedCrops.length >= 4 && !selectedCrops.includes(crop)} // Ограничение на 4 культуры
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 text-green-700 p-2 rounded-full">
              <Sprout size={20} />
            </div>
            <h3 className="font-medium">Выбранные культуры</h3>
          </div>
          <div className="text-3xl font-semibold">{selectedCrops.length}</div>
          <p className="text-gray-600 text-sm mt-1">из {CROPS.length} главных культур</p>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Ведущие регионы-производители</h4>
            <div className="space-y-2">
              {topRegions.map(region => (
                <div key={region.id} className="flex justify-between items-center">
                  <span className="text-sm">{region.name}</span>
                  <span className="text-sm font-medium">{(region.production / 1000000).toFixed(1)}M tons</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <BarChart2 size={20} />
            </div>
            <h3 className="font-medium">Объем производства</h3>
            {/* Использовал общие данные из dashboardStats для этого блока */}
            <div className="text-3xl font-semibold">{dashboardStats[0].value}</div> 
            <p className="text-gray-600 text-sm mt-1">
              {dashboardStats[0].description}, {dashboardStats[0].change > 0 ? '+' : ''}{dashboardStats[0].change}% к прошлому году
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Лучшие культуры по объему</h4>
            <div className="space-y-2">
              {topCropsByVolume.map((crop, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{crop.name}</span>
                  <span className="text-sm font-medium">{crop.value}%</span> {/* В % так как из nationalCropDistribution */}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-medium">Эффективность урожая</h3>
            {/* Использовал общие данные из dashboardStats для этого блока */}
            <div className="text-3xl font-semibold">{dashboardStats[2].value}</div>
            <p className="text-gray-600 text-sm mt-1">
              {dashboardStats[2].description}, {dashboardStats[2].change > 0 ? '+' : ''}{dashboardStats[2].change}% прирост
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Факторы, влияющие на урожайность</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Прогноз погоды</span>
                <span className="text-sm font-medium">Favorable</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Охват орошения</span>
                <span className="text-sm font-medium">72%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Индекс здоровья почвы</span>
                <span className="text-sm font-medium">Хороший</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={filteredProductionData}
          keys={lineChartProductionKeys} 
          title="Тенденция производства сельскохозяйственных культур"
          xAxisLabel="Год"
          yAxisLabel="Продукция (тыс. тонн)"
        />
        
        <LineChart
          data={filteredYieldData}
          keys={lineChartYieldKeys} 
          title="Тенденции урожайности"
          yAxisLabel="Урожайность (тонн/акр)" // <-- Комментарий удален из атрибута
        /> {/* Изменено, чтобы отразить, что это урожайность */} {/* <-- Комментарий теперь здесь */}
      </div>
      
      <div>
        <BarChart
          data={regionalCropComparison}
          keys={barChartKeys} 
          title="Региональное распределение по видам (тыс. тонн)"
          xAxisLabel="Регион"
          yAxisLabel="Продукция"
        />
      </div>
    </div>
  );
};

export default CropAnalytics;