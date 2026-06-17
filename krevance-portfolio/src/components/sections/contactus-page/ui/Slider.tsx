// src/components/ui/Slider.tsx
import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  onChange,
  leftLabel,
  rightLabel,
  className = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 bg-[#D1C9C0] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:bg-[#2D3B2D]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:bg-[#2D3B2D]
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0"
          style={{
            background: `linear-gradient(to right, #2D3B2D 0%, #2D3B2D ${percentage}%, #D1C9C0 ${percentage}%, #D1C9C0 100%)`,
          }}
        />
      </div>
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-2">
          <span className="text-xs text-[#A0978E] italic">{leftLabel}</span>
          <span className="text-xs text-[#A0978E] italic">{rightLabel}</span>
        </div>
      )}
    </div>
  );
};

export default Slider;