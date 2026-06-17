// src/components/sections/contactus-page/MobileSummarySheet.tsx
import React, { useEffect } from 'react';
import styles from '../../../styles/mobilesummarysheet.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileSummarySheet: React.FC<Props> = ({ isOpen, onClose, children }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`${styles.sheet} ${isOpen ? styles.sheetOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.handle} />
          <div className={styles.headerRow}>
            <h3 className={styles.title}>Project Summary</h3>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default MobileSummarySheet;