import React from 'react';
import styles from '../../../../styles/button.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({
  variant = 'primary',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default Button;