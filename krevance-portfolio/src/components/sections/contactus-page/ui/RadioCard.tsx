import React from 'react';
import styles from '../../../../styles/radiocard.module.css';

interface Props {
  label: string;
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
  hideRadio?: boolean;   // ← NEW: hide the circle indicator
}

const RadioCard: React.FC<Props> = ({
  label,
  value,
  selected,
  onClick,
  hideRadio = false,
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`${styles.card} ${selected ? styles.cardSelected : ''} ${
        hideRadio ? styles.cardCentered : ''
      }`}
    >
      {!hideRadio && (
        <span className={`${styles.radio} ${selected ? styles.radioSelected : ''}`}>
          {selected && <span className={styles.radioDot} />}
        </span>
      )}
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default RadioCard;