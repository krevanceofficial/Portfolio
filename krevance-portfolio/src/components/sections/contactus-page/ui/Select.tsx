import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../../styles/select.module.css';
import { SelectOption } from '../types/types';

interface Props {
  label?: string;
  required?: boolean;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const Select: React.FC<Props> = ({
  label, required, options, value, onChange, placeholder = 'Select an option', error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && '*'}
        </label>
      )}
      <button
        type="button"
        className={`${styles.trigger} ${error ? styles.error : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selected ? '' : styles.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              className={`${styles.option} ${value === o.value ? styles.optionSelected : ''}`}
              onClick={() => { onChange(o.value); setIsOpen(false); }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Select;