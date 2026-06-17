import React from 'react';
import styles from '../../../styles/bookmeetingcard.module.css';
import Calendar from './ui/Calendar';
import TimeSlotPicker from './ui/TimeSlotPicker';
import { TimeSlot } from './types/types';

interface Props {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const defaultSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: true },
];

const BookMeetingCard: React.FC<Props> = ({ selectedDate, onDateSelect, selectedTime, onTimeSelect }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Book a Meeting</h3>
      <Calendar selectedDate={selectedDate} onDateSelect={onDateSelect} />
      <div className={styles.timeSection}>
        <TimeSlotPicker slots={defaultSlots} selectedTime={selectedTime} onTimeSelect={onTimeSelect} />
      </div>
    </div>
  );
};

export default BookMeetingCard;