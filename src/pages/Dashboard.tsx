// src/pages/Dashboard.tsx
import React from 'react';
import { Brain as Grain, Droplet, Scaling as Seedling, TrendingUp } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import { 
  dashboardStats, 
  cropProductionTrend, 
  nationalCropDistribution,
  regionalCropComparison // Добавил, если она нужна здесь
} from '../data/mockData';

const Dashboard: React.FC = () => {
  const iconMap = {
    'Общий объем производства': <Grain size={24} />,
    'Площадь посевов': <Seedling size={24} />,
    'Эффективность урожая': <TrendingUp size={24} />,
    'Потребление воды': <Droplet size={24} />,
  };

  return (
    <div className="space-y-6 scale-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Opmaida Dashboard</h1>
        <div className="flex space-x-2">
          <select className="select text-sm">
            <option>2023 Season</option>
            <option>2022 Season</option>
            <option>2021 Season</option>
          </select>
          <button className="btn btn-primary text-sm">Экспорт отчета</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map(stat => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={iconMap[stat.title as keyof typeof iconMap]}
            description={stat.description}
            color={stat.change > 0 ? 'green' : 'red'}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={cropProductionTrend}
          // Ключи должны соответствовать ключам в mockData.ts -> cropProductionTrend
          keys={['Corn', 'Soybeans', 'Wheat', 'Cotton']} 
          title="Национальные тенденции производства"
          xAxisLabel="Год"
          yAxisLabel="Производство"
        />
        <PieChart
          data={nationalCropDistribution}
          title="Распределение урожая по площади (%)"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <BarChart
          data={regionalCropComparison}
          // Ключи должны соответствовать ключам в mockData.ts -> regionalCropComparison
          keys={['Fruits', 'Vegetables', 'Nuts', 'Grains']} 
          title="Сравнение региональных типов культур (тыс. тонн)"
          xAxisLabel="Регион"
          yAxisLabel="Производство"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-medium mb-4">Последние сельскохозяйственные идеи</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div className="bg-green-100 text-green-700 p-2 rounded-full">
              <TrendingUp size={16} />
            </div>
            <div>
              <h3 className="font-medium">Производство кукурузы демонстрирует устойчивый рост</h3>
              <p className="text-sm text-gray-600">Урожайность кукурузы выросла на 7% по сравнению с предыдущим сезоном благодаря улучшению агротехнических приемов.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
              <Droplet size={16} />
            </div>
            <div>
              <h3 className="font-medium">Усилия по экономии воды приносят плоды</h3>
              <p className="text-sm text-gray-600">Внедрение интеллектуальных систем орошения сократило потребление воды на 15% в ключевых сельхозрегионах.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <Seedling size={16} />
            </div>
            <div>
              <h3 className="font-medium">Новые засухоустойчивые сорта подают надежды</h3>
              <p className="text-sm text-gray-600">Новые сорта показали на 30% большую засухоустойчивость по сравнению с традиционными.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;