import React, { useState } from 'react';
import styles from '../../../../styles/personalinfoform.module.css';
import Input from '../ui/Input';
import PhoneInput from '../ui/PhoneInput';
import Button from '../ui/Button';
import { FormData } from '../types/types';

interface Props {
  formData: FormData;
  onUpdate: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
}

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="100%" height="100%">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PersonalInfoForm: React.FC<Props> = ({ formData, onUpdate, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.phoneNumber.trim()) e.phoneNumber = 'Phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        required
        placeholder="John Doe"
        value={formData.fullName}
        onChange={(e) => onUpdate('fullName', e.target.value)}
        error={errors.fullName}
      />
      <Input
        label="Email Address"
        required
        type="email"
        placeholder="johndoe@gmail.com"
        value={formData.email}
        onChange={(e) => onUpdate('email', e.target.value)}
        error={errors.email}
      />
      <PhoneInput
        countryCode={formData.countryCode}
        phoneNumber={formData.phoneNumber}
        onCountryCodeChange={(c) => onUpdate('countryCode', c)}
        onPhoneNumberChange={(n) => onUpdate('phoneNumber', n)}
        error={errors.phoneNumber}
      />

      <hr className={styles.divider} />

      <Button type="submit" fullWidth icon={<ChevronRight />}>Next Step</Button>
    </form>
  );
};

export default PersonalInfoForm;