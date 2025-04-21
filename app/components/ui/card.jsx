import React from 'react';

const Card = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={`bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden ${
        props.className || ''
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
