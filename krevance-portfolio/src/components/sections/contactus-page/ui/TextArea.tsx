import React, { forwardRef } from 'react';
import styles from '../../../../styles/textarea.module.css';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, required, error, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && '*'}
          </label>
        )}
        <textarea
          ref={ref}
          rows={6}
          className={`${styles.textarea} ${error ? styles.error : ''}`}
          {...props}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;