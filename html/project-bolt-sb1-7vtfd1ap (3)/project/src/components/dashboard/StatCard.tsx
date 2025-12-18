import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
  color?: 'green' | 'amber' | 'blue' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  description,
  color = 'green'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return {
          iconBg: 'bg-green-100',
          iconText: 'text-green-700',
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-100',
          iconText: 'text-amber-700',
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-700',
        };
      case 'red':
        return {
          iconBg: 'bg-red-100',
          iconText: 'text-red-700',
        };
      default:
        return {
          iconBg: 'bg-green-100',
          iconText: 'text-green-700',
        };
    }
  };

  const { iconBg, iconText } = getColorClasses();

  return (
    <div className="card p-6 h-full card-hover">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <>
                  <ArrowUpRight size={16} className="text-green-600" />
                  <span className="text-green-600 text-sm font-medium ml-1">+{change}%</span>
                </>
              ) : change < 0 ? (
                <>
                  <ArrowDownRight size={16} className="text-red-600" />
                  <span className="text-red-600 text-sm font-medium ml-1">{change}%</span>
                </>
              ) : (
                <>
                  <Minus size={16} className="text-gray-500" />
                  <span className="text-gray-500 text-sm font-medium ml-1">0%</span>
                </>
              )}
              <span className="text-gray-500 text-sm ml-1">from last season</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        
        <div className={`${iconBg} ${iconText} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;