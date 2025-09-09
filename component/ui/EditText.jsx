'use client';
import React, { useState } from 'react';

const EditText = ({
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  className = '',
  error = '',
  label = '',
  required = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e?.target?.value);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full
          px-3 py-2 sm:px-4 sm:py-3
          text-sm sm:text-base
          border border-gray-300
          rounded-md sm:rounded-lg
          transition-all
          duration-200
          ease-in-out
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white hover:border-gray-400'}
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${focused ? 'shadow-sm' : ''}
          min-h-[44px] sm:min-h-[48px]
          touch-manipulation
          ${className}
        `?.trim()?.replace(/\s+/g, ' ')}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default EditText;