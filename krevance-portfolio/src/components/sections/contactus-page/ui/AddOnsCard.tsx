import React from 'react';
import styles from '../../../../styles/addonscard.module.css';
import Toggle from './Toggle';
import { AddOn } from '../types/types';

interface Props {
  addOns: AddOn[];
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
  projectTypeSelected: boolean;
}

const AddOnsCard: React.FC<Props> = ({ addOns, selectedAddOns, onToggleAddOn, projectTypeSelected }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Add-ons & Extra</h3>

      {!projectTypeSelected ? (
        <div className={styles.empty}>
          <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <p className={styles.emptyText}>Add-ons appear after you choose a project type.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {addOns.map((addOn) => (
            <div key={addOn.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{addOn.name}</span>
                <span className={styles.itemPrice}>₱{addOn.price.toLocaleString()}</span>
              </div>
              <Toggle
                checked={selectedAddOns.includes(addOn.id)}
                onChange={() => onToggleAddOn(addOn.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddOnsCard;