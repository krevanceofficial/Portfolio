// src/components/sections/contactus-page/MobileSummaryBar.tsx
import React from 'react';
import styles from '../../../styles/mobilesummarybar.module.css';
import { CostBreakdown } from './types/types';

interface Props {
  breakdown: CostBreakdown;
  meetingTime: string;
  onOpen: () => void;
}

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const MobileSummaryBar: React.FC<Props> = ({ breakdown, meetingTime, onOpen }) => {
  const formatPrice = (price: number | null) => {
    if (price === null) return null;
    if (price === 0) return '₱0';
    return `₱${price.toLocaleString()}`;
  };

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.eyebrow}>Starts At</span>
        {breakdown.startsAt !== null ? (
          <span className={styles.price}>{formatPrice(breakdown.startsAt)}</span>
        ) : (
          <span className={styles.dashLine} />
        )}
        <span className={styles.meta}>
          {meetingTime ? meetingTime : 'No meeting set yet'}
        </span>
      </div>

      <button type="button" className={styles.viewBtn} onClick={onOpen}>
        <BookIcon />
        <span>View Details</span>
      </button>
    </div>
  );
};

export default MobileSummaryBar;