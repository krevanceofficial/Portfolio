// src/components/forms/ProjectTypeForm.tsx
import React, { useState } from 'react';
import styles from '../../../../styles/projecttype.module.css';
import Button from '../ui/Button';
import RadioCard from '../ui/RadioCard';
import Select from '../ui/Select';
import { FormData } from '../types/types';
import {
  projectTypes,
  stageOptions,
  goalOptions,
} from '../utils/labels';

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

const ProjectTypeForm: React.FC<Props> = ({ formData, onUpdate, onNext, onPrev }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.projectType) e.projectType = 'Required';
    if (!formData.projectStage) e.projectStage = 'Required';
    if (!formData.primaryGoal) e.primaryGoal = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className={styles.form}>
      <div className={styles.section}>
        <label className={styles.sectionLabel}>What type of project do you need?</label>
        <div className={styles.grid}>
          {projectTypes.map((t) => (
            <RadioCard
              key={t.id}
              label={t.name}
              value={t.id}
              selected={formData.projectType === t.id}
              onClick={(v) => onUpdate('projectType', v)}
            />
          ))}
        </div>
      </div>

      <Select
        label="What best describes your project stage?"
        required
        options={stageOptions}
        value={formData.projectStage}
        onChange={(v) => onUpdate('projectStage', v)}
        placeholder="Select stage"
        error={errors.projectStage}
      />

      <Select
        label="What is your primary goal?"
        required
        options={goalOptions}
        value={formData.primaryGoal}
        onChange={(v) => onUpdate('primaryGoal', v)}
        placeholder="Select goal"
        error={errors.primaryGoal}
      />

      <hr className={styles.divider} />

      <div className={styles.actions}>
        <Button variant="outline" onClick={onPrev} icon={<ChevronLeft />} iconPosition="left">
          Back
        </Button>
        <Button onClick={() => validate() && onNext()} icon={<ChevronRight />}>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default ProjectTypeForm;