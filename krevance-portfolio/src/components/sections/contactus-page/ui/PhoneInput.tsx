import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../../styles/phoneinput.module.css';
import { CountryCode } from '../types/types';

interface Props {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  error?: string;
}

const countryCodes: CountryCode[] = [
  { code: 'PH', dial: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore' },
];

const PhoneInput: React.FC<Props> = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = countryCodes.find((c) => c.dial === countryCode) || countryCodes[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // 🟢 Sanitize raw input → strip non-digits, strip leading zeros, max 10
  const sanitize = (raw: string) => {
    let digits = raw.replace(/\D/g, '');
    digits = digits.replace(/^0+/, '');
    if (digits.length > 10) digits = digits.slice(0, 10);
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPhoneNumberChange(sanitize(e.target.value));
  };

  // 🟢 Block "0" as the first character at keystroke level
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const isAtStart = input.selectionStart === 0;
    const isFirstChar = phoneNumber.length === 0 || isAtStart;

    if (e.key === '0' && isFirstChar) {
      e.preventDefault();
    }
  };

  // 🟢 Sanitize pasted content (handles things like "+639171234567" or "09171234567")
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    onPhoneNumberChange(sanitize(pasted));
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Contact Number*</label>
      <div className={styles.inputRow}>
        <div ref={ref} className={styles.codeSelector}>
          <button
            type="button"
            className={styles.codeButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles.codeFlag}>{selected.flag}</span>
            <span>{selected.code} {selected.dial}</span>
            <svg
              className={`${styles.codeChevron} ${isOpen ? styles.codeChevronOpen : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className={styles.dropdown}>
              {countryCodes.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={styles.dropdownItem}
                  onClick={() => { onCountryCodeChange(c.dial); setIsOpen(false); }}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                  <span className={styles.dropdownDial}>{c.dial}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={phoneNumber}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="9171234567"
          className={`${styles.phoneInput} ${error ? styles.error : ''}`}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default PhoneInput;