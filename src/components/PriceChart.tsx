import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { PriceData } from '../App';

interface PriceChartProps {
  data: PriceData[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const chartData = data
    .filter(item => item.shippingToHK) // Only show items that ship to HK
    .map(item => ({
      platform: item.platform,
      price: item.price,
      shipping: item.shipping,
      total: item.price + item.shipping,
      currency: item.currency
    }));

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-HK', {
      style: 'currency',
      currency: 'HKD',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: '0', color: '#8884d8' }}>
            Price: {formatPrice(payload[0]?.value || 0)}
          </p>
          <p style={{ margin: '0', color: '#82ca9d' }}>
            Shipping: {formatPrice(payload[1]?.value || 0)}
          </p>
          <p style={{ margin: '0', color: '#ffc658', fontWeight: 'bold' }}>
            Total: {formatPrice((payload[0]?.value || 0) + (payload[1]?.value || 0))}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="platform" 
          angle={-45}
          textAnchor="end"
          height={80}
          fontSize={12}
        />
        <YAxis 
          tickFormatter={formatPrice}
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="price" 
          stackId="a" 
          fill="#8884d8" 
          name="Product Price"
        />
        <Bar 
          dataKey="shipping" 
          stackId="a" 
          fill="#82ca9d" 
          name="Shipping Cost"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;