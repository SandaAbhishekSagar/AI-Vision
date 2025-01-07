import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  disabled = false,
  rows
}) => {
  const baseClassName = "block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500";
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClassName}
          required
          disabled={disabled}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClassName}
          required
          disabled={disabled}
        />
      )}
    </div>
  );
};