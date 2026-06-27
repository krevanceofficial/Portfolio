// src/hooks/useMultiStepForm.ts
<<<<<<< HEAD
import { useState, useCallback } from 'react';
import { FormData } from '../types/types';

=======
import { useState, useCallback, useEffect } from 'react';
import { FormData } from '../types/types';

const STORAGE_KEY_FORM = 'krevance_formData';
const STORAGE_KEY_STEP = 'krevance_currentStep';

>>>>>>> loel
const initialFormData: FormData = {
  fullName: '',
  email: '',
  countryCode: '+63',
  phoneNumber: '',
  projectType: '',
  projectStage: '',
  primaryGoal: '',
  budgetLevel: '',
  timeline: '',
  referral: '',
  projectName: '',
  projectDescription: '',
  selectedDate: null,
  selectedTime: '',
  addOns: [],
};

/** Safely load a value from localStorage (SSR-safe for Next.js). */
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        return JSON.parse(raw) as T;
      }
    } catch {
      // Ignore corrupt data – fall through to fallback
    }
  }
  return fallback;
}

/** Reconstruct a FormData object, restoring the Date for selectedDate. */
function restoreFormData(saved: Partial<FormData>): FormData {
  return {
    ...initialFormData,
    ...saved,
    // selectedDate was serialised as a string by JSON.stringify; turn it back into a Date
    selectedDate: saved.selectedDate ? new Date(saved.selectedDate) : null,
  };
}

export function useMultiStepForm(totalSteps: number) {
  // ---------- initialise with defaults (SSR-safe: server & client 1st paint match) ----------
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // ---------- restore persisted state after hydration ----------
  useEffect(() => {
    const savedStep = loadFromStorage<number>(STORAGE_KEY_STEP, 1);
    setCurrentStep(Math.min(Math.max(savedStep, 1), totalSteps));

    const savedForm = loadFromStorage<Partial<FormData>>(STORAGE_KEY_FORM, {});
    setFormData(restoreFormData(savedForm));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- persist to localStorage whenever state changes ----------
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STEP, JSON.stringify(currentStep));
    } catch {
      // Storage full or unavailable – silently ignore
    }
  }, [currentStep]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData));
    } catch {
      // Storage full or unavailable – silently ignore
    }
  }, [formData]);

  // ---------- helpers ----------
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [totalSteps]
  );

  const updateFormData = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

<<<<<<< HEAD
  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setFormData(initialFormData);
=======
  /** Reset everything – including localStorage. */
  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setFormData(initialFormData);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY_STEP);
        localStorage.removeItem(STORAGE_KEY_FORM);
      } catch {
        // ignore
      }
    }
>>>>>>> loel
  }, []);

  return {
    currentStep,
    formData,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    resetForm,
    totalSteps,
<<<<<<< HEAD
  };
=======
    /** Storage keys – exposed so callers can clear them manually too. */
    STORAGE_KEY_FORM,
    STORAGE_KEY_STEP,
  };
}

/** Convenience: clear both storage keys (call after successful submit). */
export function clearFormStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY_STEP);
      localStorage.removeItem(STORAGE_KEY_FORM);
    } catch {
      // ignore
    }
  }
>>>>>>> loel
}