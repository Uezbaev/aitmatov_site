import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartData {
  name: string;
  [key: string]: string | number;
}

interface LineChartProps {
  data: LineChartData[];
  keys: string[];
  colors?: string[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const defaultColors = [
  '#2D6A4F', // primary
  '#96997C', // primary light
  '#D4A373', // secondary
  '#D14959', // accent
];

const LineChart: React.FC<LineChartProps> = ({
  data,
  keys,
  colors = defaultColors,
  title,
  xAxisLabel,
  yAxisLabel,
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
          <RechartsLineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ 
                value: xAxisLabel, 
                position: 'insideBottom', 
                offset: -15,
                fontSize: 12,
                fill: '#6b7280' 
              }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft',
                fontSize: 12,
                fill: '#6b7280' 
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            {keys.map((key, index) => (
              <Line 
                key={key} 
                type="monotone"
                dataKey={key} 
                stroke={colors[index % colors.length]} 
                activeDot={{ r: 6 }}
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                animationDuration={1500}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;