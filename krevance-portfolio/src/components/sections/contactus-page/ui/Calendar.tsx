// src/components/ui/Calendar.tsx
import React, { useState, useMemo } from 'react';
import styles from '../../../../styles/calendar.module.css';

interface Props {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

type ViewMode = 'days' | 'monthYear';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const Calendar: React.FC<Props> = ({ selectedDate, onDateSelect }) => {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [viewMode, setViewMode] = useState<ViewMode>('days');
  const [pickerYear, setPickerYear] = useState(currentMonth.getFullYear());

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const result: { date: Date; isCurrentMonth: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      result.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }

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

  // Check if a day is in the past (before today)
  const isPastDay = (date: Date) => {
    return date < today;
  };

  // Check if a month is in the past
  const isPastMonth = (year: number, monthIndex: number) => {
    return (
      year < today.getFullYear() ||
      (year === today.getFullYear() && monthIndex < today.getMonth())
    );
  };

  // Check if we can go to previous month (prevent navigating before current month)
  const canGoPrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    return (
      prevMonth.getFullYear() > today.getFullYear() ||
      (prevMonth.getFullYear() === today.getFullYear() &&
        prevMonth.getMonth() >= today.getMonth())
    );
  };

  // Check if we can go to previous year in picker
  const canGoPrevYear = () => {
    return pickerYear - 1 >= today.getFullYear();
  };

  const handleHeaderClick = () => {
    setPickerYear(currentMonth.getFullYear());
    setViewMode('monthYear');
  };

  const handleMonthSelect = (monthIndex: number) => {
    if (isPastMonth(pickerYear, monthIndex)) return;
    setCurrentMonth(new Date(pickerYear, monthIndex, 1));
    setViewMode('days');
  };

  const handlePrevMonth = () => {
    if (!canGoPrevMonth()) return;
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handlePrevYear = () => {
    if (!canGoPrevYear()) return;
    setPickerYear((y) => y - 1);
  };

  const handleNextYear = () => {
    setPickerYear((y) => y + 1);
  };

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (!isCurrentMonth || isPastDay(date)) return;
    onDateSelect(date);
  };

  return (
    <div className={styles.wrapper}>
      {/* ───── HEADER ───── */}
      <div className={styles.header}>
        <button
          type="button"
          className={`${styles.navButton} ${
            viewMode === 'days'
              ? !canGoPrevMonth() ? styles.navButtonDisabled : ''
              : !canGoPrevYear() ? styles.navButtonDisabled : ''
          }`}
          onClick={viewMode === 'days' ? handlePrevMonth : handlePrevYear}
          disabled={viewMode === 'days' ? !canGoPrevMonth() : !canGoPrevYear()}
          aria-label={viewMode === 'days' ? 'Previous month' : 'Previous year'}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {viewMode === 'days' ? (
          <button
            type="button"
            className={styles.headerLabel}
            onClick={handleHeaderClick}
            aria-label="Open month and year picker"
          >
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </button>
        ) : (
          <button
            type="button"
            className={styles.headerLabel}
            onClick={() => setViewMode('days')}
            aria-label="Back to calendar"
          >
            {pickerYear}
          </button>
        )}

        <button
          type="button"
          className={styles.navButton}
          onClick={viewMode === 'days' ? handleNextMonth : handleNextYear}
          aria-label={viewMode === 'days' ? 'Next month' : 'Next year'}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ───── DAY VIEW ───── */}
      {viewMode === 'days' && (
        <>
          <div className={styles.daysRow}>
            {DAYS.map((d) => (
              <div key={d} className={styles.dayName}>{d}</div>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {days.map(({ date, isCurrentMonth }, i) => {
              const past = isPastDay(date);
              const disabled = !isCurrentMonth || past;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDayClick(date, isCurrentMonth)}
                  disabled={disabled}
                  className={`
                    ${styles.day}
                    ${isSelected(date) ? styles.daySelected : ''}
                    ${!isCurrentMonth ? styles.dayOutsideMonth : ''}
                    ${isCurrentMonth && past ? styles.dayPast : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ───── MONTH / YEAR PICKER VIEW ───── */}
      {viewMode === 'monthYear' && (
        <div className={styles.monthsGrid}>
          {MONTHS_SHORT.map((month, index) => {
            const isActiveMonth =
              pickerYear === currentMonth.getFullYear() &&
              index === currentMonth.getMonth();
            const past = isPastMonth(pickerYear, index);

            return (
              <button
                key={month}
                type="button"
                onClick={() => handleMonthSelect(index)}
                disabled={past}
                className={`
                  ${styles.monthItem}
                  ${isActiveMonth ? styles.monthItemActive : ''}
                  ${past ? styles.monthItemDisabled : ''}
                `}
              >
                {month}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;