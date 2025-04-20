import React from 'react';

const PageContainer = ({ title, children }) => {
  return (
    <div className="md:ml-64 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{title}</h1>
      {children}
    </div>
  );
};

export default PageContainer;