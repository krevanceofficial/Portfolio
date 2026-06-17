// src/components/ui/Divider.tsx
import React from 'react';

interface DividerProps {
  className?: string;
  color?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '', color }) => {
  return (
    <hr
      className={`border-t ${color || 'border-[#D1C9C0]'} ${className}`}
    />
  );
};

export default Divider;