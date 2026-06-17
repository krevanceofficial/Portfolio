import React from 'react';
import styles from '../../../../styles/timeslotpicker.module.css';
import { TimeSlot } from '../types/types';

interface Props {
  slots: TimeSlot[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeSlotPicker: React.FC<Props> = ({ slots, selectedTime, onTimeSelect }) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Available Time Slots</h4>
      <div className={styles.grid}>
        {slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            disabled={!slot.available}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            className={`${styles.slot} ${selectedTime === slot.time ? styles.slotSelected : ''}`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;