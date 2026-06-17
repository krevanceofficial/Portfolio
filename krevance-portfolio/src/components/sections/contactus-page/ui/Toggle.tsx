import React from 'react';
import styles from '../../../../styles/toggle.module.css';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
    >
      <span className={`${styles.thumb} ${checked ? styles.thumbOn : ''}`} />
    </button>
  );
};

export default Toggle;