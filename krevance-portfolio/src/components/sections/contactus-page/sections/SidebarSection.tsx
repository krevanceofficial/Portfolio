// src/components/sections/SidebarSection.tsx
import React from 'react';

interface SidebarSectionProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
};

export default SidebarSection;