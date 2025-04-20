import React, { useRef, useEffect } from 'react';
import { formatCurrency, getMonthName } from '../../utils/formatters';

const MonthlyChart = ({ monthlyData }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || Object.keys(monthlyData).length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Get sorted months
    const sortedMonths = Object.keys(monthlyData).sort();
    const values = sortedMonths.map(month => monthlyData[month]);
    
    // Find max value for scaling
    const maxValue = Math.max(...values);
    
    // Set up dimensions
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const barWidth = (width - 2 * padding) / sortedMonths.length - 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Draw bars
    sortedMonths.forEach((month, index) => {
      const value = monthlyData[month];
      const barHeight = ((height - 2 * padding) * value) / (maxValue || 1);
      const x = padding + index * ((width - 2 * padding) / sortedMonths.length);
      const y = height - padding - barHeight;
      
      // Draw bar
      ctx.fillStyle = '#0d9488';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Add month label
      ctx.fillStyle = '#4b5563';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(month.substring(5, 7) + '/' + month.substring(2, 4), x + barWidth / 2, height - padding + 16);
      
      // Add value label
      ctx.fillStyle = '#1f2937';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(formatCurrency(value), x + barWidth / 2, y - 8);
    });
    
  }, [monthlyData]);
  
  // If no data, show placeholder
  if (Object.keys(monthlyData).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Spending</h2>
        <div className="flex justify-center items-center h-60 text-gray-500">
          <p>No monthly data available yet</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Spending</h2>
      
      <canvas ref={canvasRef} width={600} height={300} className="w-full"></canvas>
      <div className="mt-4 space-y-2">
        {Object.entries(monthlyData)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([month, amount]) => (
            <div key={month} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
              <span className="font-medium text-gray-700">{getMonthName(month)}</span>
              <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MonthlyChart;