import React, { useState } from 'react';
import styles from '../../../../styles/addonsform.module.css';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/TextArea';
import { FormData } from '../types/types';

interface Props {
  formData: FormData;
  onUpdate: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="100%" height="100%">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="100%" height="100%">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const AddOnsForm: React.FC<Props> = ({ formData, onUpdate, onNext, onPrev }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.projectName.trim()) e.projectName = 'Project name is required';
    if (!formData.projectDescription.trim()) e.projectDescription = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className={styles.form}>
      <Input
        label="Project Name"
        required
        placeholder="e.g. Krevance Portfolio Website"
        value={formData.projectName}
        onChange={(e) => onUpdate('projectName', e.target.value)}
        error={errors.projectName}
      />
      <Textarea
        label="Project Description"
        required
        placeholder="Tell us about your idea, goals, target audience, or any features you'd like to include."
        value={formData.projectDescription}
        onChange={(e) => onUpdate('projectDescription', e.target.value)}
        error={errors.projectDescription}
      />

      <hr className={styles.divider} />

      <div className={styles.actions}>
        <Button variant="outline" onClick={onPrev} icon={<ChevronLeft />} iconPosition="left">Back</Button>
        <Button onClick={() => validate() && onNext()} icon={<ChevronRight />}>Next Step</Button>
      </div>
    </div>
  );
};

export default AddOnsForm;