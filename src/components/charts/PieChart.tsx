import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  colors?: string[];
  title?: string;
}

const defaultColors = [
  '#2D6A4F', // primary
  '#4C7C62', // lighter primary
  '#96997C',
  '#D4A373', // secondary
  '#E6C28C', // lighter secondary
  '#D14959', // accent
];

const PieChart: React.FC<PieChartProps> = ({
  data,
  colors = defaultColors,
  title,
}) => {
  return (
    <div className="card h-full">
      {title && (
        <div className="p-4 border-b">
          <h3 className="font-medium">{title}</h3>
        </div>
      )}
      <div className="p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              labelLine={false}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => Number(value).toLocaleString()}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
              }}
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;