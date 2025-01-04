import React from 'react';

const Input = ({ id, name, type = 'text', value, onChange, className, ...props }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 rounded-md border focus:outline-none ${className}`}
      {...props}
    />
  );
};

export default Input;
