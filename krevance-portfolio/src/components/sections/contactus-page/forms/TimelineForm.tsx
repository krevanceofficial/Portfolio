// src/components/forms/TimelineForm.tsx
import React, { useState } from 'react';
import styles from '../../../../styles/timelineform.module.css';
import Button from '../ui/Button';
import RadioCard from '../ui/RadioCard';
import Select from '../ui/Select';
import { FormData } from '../types/types';
import {
  getBudgetOptions,          // ← use the helper instead
  getProjectTypeLabel,       // ← optional: for a nicer section label
  timelineOptions,
  referralOptions,
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

const TimelineForm: React.FC<Props> = ({ formData, onUpdate, onNext, onPrev }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get the budget tiers for the CURRENTLY selected project type
  const budgetOptions = getBudgetOptions(formData.projectType);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.budgetLevel) e.budgetLevel = 'Required';
    if (!formData.timeline)    e.timeline    = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className={styles.form}>
      <div className={styles.section}>
        <label className={styles.sectionLabel}>
          What is your budget level
          {formData.projectType
            ? ` for ${getProjectTypeLabel(formData.projectType)}?`
            : '?'}
          *
        </label>

        {budgetOptions.length === 0 ? (
          <p className={styles.helperText}>
            Please select a project type in the previous step to see available budget tiers.
          </p>
        ) : (
          <div className={styles.grid}>
            {budgetOptions.map((o) => (
              <RadioCard
                key={o.id}
                label={`${o.label}`}
                value={o.id}
                selected={formData.budgetLevel === o.id}
                onClick={(v) => onUpdate('budgetLevel', v)}
              />
            ))}
          </div>
        )}

        {errors.budgetLevel && (
          <p className={styles.errorText}>{errors.budgetLevel}</p>
        )}
      </div>

      <div className={styles.section}>
        <label className={styles.sectionLabel}>Desired Timeline*</label>
        <div className={styles.grid}>
          {timelineOptions.map((o) => (
            <RadioCard
              key={o.id}
              label={o.label}
              value={o.id}
              selected={formData.timeline === o.id}
              onClick={(v) => onUpdate('timeline', v)}
            />
          ))}
        </div>
        {errors.timeline && (
          <p className={styles.errorText}>{errors.timeline}</p>
        )}
      </div>

      <Select
        label="How did you hear about Krevance?"
        options={referralOptions}
        value={formData.referral}
        onChange={(v) => onUpdate('referral', v)}
        placeholder="Select an option"
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

export default TimelineForm;