import React from 'react';
import styles from '../../../../styles/radiocard.module.css'

interface Props {
  label: string;
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const RadioCard: React.FC<Props> = ({ label, value, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
    >
      <span className={`${styles.radio} ${selected ? styles.radioSelected : ''}`}>
        {selected && <span className={styles.radioDot} />}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default RadioCard;