// src/components/forms/ReviewForm.tsx
import React from 'react';
import styles from '../../../../styles/reviewform.module.css';
import Button from '../ui/Button';
import { FormData } from '../types/types';
import {
  getProjectTypeLabel,
  getStageLabel,
  getGoalLabel,
  getBudgetLabel,
  getTimelineLabel,
  getReferralLabel,
} from '../utils/labels';

interface Props {
  formData: FormData;
  onPrev: () => void;
  onEditStep: (step: number) => void;
  onSubmit: () => void; // now means "Continue to Scheduling"
}

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

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

const ReviewForm: React.FC<Props> = ({ formData, onPrev, onEditStep, onSubmit }) => {
  return (
    <div className={styles.form}>
      {/* Personal Information */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <button type="button" onClick={() => onEditStep(1)} className={styles.editButton}>
            <EditIcon /> Edit
          </button>
        </div>
        <div className={styles.fields}>
          <div>
            <p className={styles.fieldLabel}>Full Name</p>
            <p className={styles.fieldValue}>{formData.fullName || '-'}</p>
          </div>
          <div>
            <p className={styles.fieldLabel}>Email Address</p>
            <p className={styles.fieldValue}>{formData.email || '-'}</p>
          </div>
          <div>
            <p className={styles.fieldLabel}>Phone Number</p>
            <p className={styles.fieldValue}>
              {formData.phoneNumber ? `${formData.countryCode}${formData.phoneNumber}` : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Project Information</h3>
          <button type="button" onClick={() => onEditStep(2)} className={styles.editButton}>
            <EditIcon /> Edit
          </button>
        </div>
        <div className={styles.fields}>
          <div>
            <p className={styles.fieldLabel}>Project Type</p>
            <p className={styles.fieldValue}>{getProjectTypeLabel(formData.projectType)}</p>
          </div>
          <div>
            <p className={styles.fieldLabel}>Project Stage</p>
            <p className={styles.fieldValue}>{getStageLabel(formData.projectStage)}</p>
          </div>
          <div>
            <p className={styles.fieldLabel}>Primary Goal</p>
            <p className={styles.fieldValue}>{getGoalLabel(formData.primaryGoal)}</p>
          </div>
        </div>
      </div>

      {/* Scope & Budget */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Scope & Budget</h3>
          <button type="button" onClick={() => onEditStep(3)} className={styles.editButton}>
            <EditIcon /> Edit
          </button>
        </div>
        <div className={styles.fields}>
          <div>
            <p className={styles.fieldLabel}>Budget Level</p>
            <p className={styles.fieldValue}>{getBudgetLabel(formData.budgetLevel)}</p>
          </div>
          <div>
            <p className={styles.fieldLabel}>Timeline</p>
            <p className={styles.fieldValue}>{getTimelineLabel(formData.timeline)}</p>
          </div>
          <div>
            <p className={styles.fieldLabel}>Referral</p>
            <p className={styles.fieldValue}>{getReferralLabel(formData.referral)}</p>
          </div>
        </div>
      </div>

      {/* Vision & Description */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Vision & Description</h3>
          <button type="button" onClick={() => onEditStep(4)} className={styles.editButton}>
            <EditIcon /> Edit
          </button>
        </div>
        <div className={styles.fieldsTwo}>
          <div>
            <p className={styles.fieldLabel}>Project Name</p>
            <p className={styles.fieldValue}>{formData.projectName || '-'}</p>
          </div>
          <div>
            <p className={styles.fieldLabel}>Description</p>
            <p className={styles.fieldValue}>{formData.projectDescription || '-'}</p>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.actions}>
        <Button variant="outline" onClick={onPrev} icon={<ChevronLeft />} iconPosition="left">
          Back
        </Button>
        <Button onClick={onSubmit} icon={<ChevronRight />}>
          Continue to Scheduling
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;