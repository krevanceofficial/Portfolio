// src/hooks/useMultiStepForm.ts
import { useState, useCallback } from 'react';
import { FormData } from '../types/types';

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

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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

  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setFormData(initialFormData);
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
  };
}