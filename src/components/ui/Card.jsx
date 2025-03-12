import React from 'react';

function Card({ children, title, className = '', bodyClassName = '', ...props }) {
  return (
    <div className={`bg-white rounded-md shadow-card overflow-hidden ${className}`} {...props}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}

export default Card;