import React, { useRef, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../types';
import { PieChart } from 'lucide-react';

const CategoryChart = ({ categoryData }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || Object.keys(categoryData).length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const total = Object.values(categoryData).reduce((sum, value) => sum + value, 0);
    const categories = Object.keys(categoryData);
    
    // Set up the chart
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    let startAngle = 0;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw pie slices
    categories.forEach(category => {
      const value = categoryData[category];
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      // Set slice color
      ctx.fillStyle = CATEGORY_COLORS[category] || '#64748b';
      ctx.fill();
      
      // Draw slice border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Prepare for next slice
      startAngle += sliceAngle;
    });
    
    // Draw a white circle in the center for a donut chart effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
  }, [categoryData]);
  
  // If no data, show placeholder
  if (Object.keys(categoryData).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <PieChart className="text-purple-600" size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 ml-4">Spending by Category</h2>
        </div>
        <div className="flex justify-center items-center h-60 text-gray-500">
          <p>No category data available yet</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="bg-purple-100 p-3 rounded-full">
          <PieChart className="text-purple-600" size={24} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 ml-4">Spending by Category</h2>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 md:mb-0 md:flex-1">
          <canvas ref={canvasRef} width={200} height={200} className="mx-auto"></canvas>
        </div>
        
        <div className="md:w-1/2 space-y-2">
          {Object.entries(categoryData)
            .sort(([, a], [, b]) => b - a)
            .map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: CATEGORY_COLORS[category] || '#64748b' }}
                  ></div>
                  <span className="text-sm text-gray-700">{category}</span>
                </div>
                <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;