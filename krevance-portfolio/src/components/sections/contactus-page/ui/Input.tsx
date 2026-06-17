import React, { forwardRef } from 'react';
import styles from '../../../../styles/input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, required, error, className = '', ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && '*'}
          </label>
        )}
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''} ${className}`}
          {...props}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;