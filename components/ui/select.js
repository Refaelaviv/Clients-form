import React from 'react';

const Select = ({ id, name, value, onChange, options, className, ...props }) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 rounded-md border focus:outline-none ${className}`}
      {...props}
    >
      <option value="" disabled>בחר אפשרות</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
