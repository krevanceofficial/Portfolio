// src/components/ui/Calendar.tsx
import React, { useState, useMemo } from 'react';
import styles from '../../../../styles/calendar.module.css';

interface Props {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const Calendar: React.FC<Props> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1));

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const result: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month leading days
    for (let i = firstDay - 1; i >= 0; i--) {
      result.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }

    // 🟢 KEY FIX: Only fill up to the END of the last week containing current month days
    // Calculate how many cells we need (multiple of 7) — either 35 (5 weeks) or 42 (6 weeks)
    const totalCells = Math.ceil(result.length / 7) * 7;
    const remaining = totalCells - result.length;

    for (let d = 1; d <= remaining; d++) {
      result.push({ date: new Date(year, month + 1, d), isCurrentMonth: false });
    }

    return result;
  }, [currentMonth]);

  const isSelected = (date: Date) =>
    selectedDate &&
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className={styles.monthLabel}>
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={styles.daysRow}>
        {DAYS.map((d) => <div key={d} className={styles.dayName}>{d}</div>)}
      </div>

      <div className={styles.daysGrid}>
        {days.map(({ date, isCurrentMonth }, i) => (
          <button
            key={i}
            type="button"
            onClick={() => isCurrentMonth && onDateSelect(date)}
            disabled={!isCurrentMonth}
            className={`${styles.day} ${isSelected(date) ? styles.daySelected : ''} ${!isCurrentMonth ? styles.dayOutsideMonth : ''}`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;