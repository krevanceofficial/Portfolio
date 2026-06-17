// src/components/ui/Label.tsx
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({
  required = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <label
      className={`block text-sm font-bold tracking-[0.2em] uppercase text-[#2D3B2D] mb-2 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-[#2D3B2D]">*</span>}
    </label>
  );
};

export default Label;