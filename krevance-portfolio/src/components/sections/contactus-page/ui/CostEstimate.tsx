import React from 'react';
import styles from '../../../../styles/costestimate.module.css';
import { CostBreakdown } from '../types/types';

interface Props {
  breakdown: CostBreakdown;
}

const CostEstimate: React.FC<Props> = ({ breakdown }) => {
  const hasData = breakdown.basePrice !== null;
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return '—';
    if (price === 0) return '₱0';
    return `₱${price.toLocaleString()}`;
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Cost Estimate</h3>

      <div className={styles.priceWrapper}>
        <h2 className={styles.startsAt}>Investment Starts At</h2>
        {hasData ? (
          <p className={styles.price}>{formatPrice(breakdown.basePrice)}</p>
        ) : (
          <div className={styles.dashLine} />
        )}
        <p className={styles.priceCaption}>
          {hasData ? 'Indicative range · final quote after brief review' : 'Select a project type to begin'}
        </p>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${breakdown.sliderProgress}%` }} />
        </div>
        <div className={styles.progressLabels}>
          <span>Entry</span>
          <span>Enterprise</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.breakdown}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Base starting price</span>
          <span>{formatPrice(breakdown.basePrice)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Timeline multiplier</span>
          <span>{breakdown.timelineMultiplier ?? '—'}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Selected add-ons</span>
          <span>{formatPrice(breakdown.selectedAddOns)}</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.totalRow}>
        <span>Starts at</span>
        <span>{formatPrice(breakdown.startsAt)}</span>
      </div>
    </div>
  );
};

export default CostEstimate;