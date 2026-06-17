import React from 'react';
import StepIndicator from '../ui/StepIndicator';
import styles from '../../../../styles/formsection.module.css';

interface Props {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

const FormSection: React.FC<Props> = ({
  currentStep,
  totalSteps,
  title,
  description,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{description}</p>
      <div className={styles.formContent}>{children}</div>
    </div>
  );
};

export default FormSection;