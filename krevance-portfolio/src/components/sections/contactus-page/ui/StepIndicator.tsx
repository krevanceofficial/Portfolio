import React from 'react';
import styles from '../../../../styles/stepindicator.module.css'

interface Props {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>
        Step {format(currentStep)} of {format(totalSteps)}
      </span>
      <div className={styles.dashes}>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`${styles.dash} ${step <= currentStep ? styles.dashActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;