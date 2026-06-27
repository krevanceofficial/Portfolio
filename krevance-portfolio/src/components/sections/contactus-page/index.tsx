// src/App.tsx
'use client';

import React, { useState, useMemo } from 'react';
import FormSection from './sections/FormSection';
import SidebarSection from './sections/SidebarSection';
import PersonalInfoForm from './forms/PersonalInforForm';
import ProjectTypeForm from './forms/ProjectTypeForm';
import TimelineForm from './forms/TimelineForm';
import AddOnsForm from './forms/AddOnsForm';
import ReviewForm from './forms/ReviewForm';
import CostEstimate from './ui/CostEstimate';
import BookMeetingCard from './BookMeetingCard';
import AddOnsCard from './ui/AddOnsCard';
import { useMultiStepForm, clearFormStorage } from './hooks/useMultiStepForm';
import { AddOn, CostBreakdown, Step } from './types/types';
import styles from '../../../styles/contactus.module.css';
import MobileSummarySheet from './MobileSummarySheet';
import MobileSummaryBar from './MobileSummaryBar';

const steps: Step[] = [
  { number: 1, title: 'Tell Us About Yourself', description: "Let's start with the basics so we know how to reach you." },
  { number: 2, title: "What's Your Project About?", description: "Help us understand what you're looking to build." },
  { number: 3, title: 'Project Scope', description: "Let's align the project with your goals and budget." },
  { number: 4, title: 'Share Your Vision', description: 'Tell us anything that can help us better understand your project.' },
  { number: 5, title: 'Review & Submit', description: "We'll review your details and get back to you within 24–48 hours." },
];

const availableAddOns: AddOn[] = [
  { id: 'webpage', name: 'Additional web page', price: 1500 },
  { id: 'features', name: 'Additional features', price: 1500 },
  { id: 'seo', name: 'SEO starter pack', price: 4500 },
  { id: 'social', name: 'Social media branding kit', price: 1500 },
];

const budgetPriceMap: Record<string, number> = {
  starting: 20000, small: 40000, mid: 80000, large: 150000, enterprise: 300000,
};

const timelineMultiplierMap: Record<string, { multiplier: number; label: string }> = {
  asap: { multiplier: 1.35, label: 'Rush (+35%)' },
  '1month': { multiplier: 1.15, label: 'Fast (+15%)' },
  '3months': { multiplier: 1, label: 'Standard (1x)' },
  flexible: { multiplier: 0.9, label: 'Relaxed (-10%)' },
};

const ContactUsSection: React.FC = () => {
  const { currentStep, formData, nextStep, prevStep, goToStep, updateFormData, resetForm, totalSteps } =
    useMultiStepForm(5);
  const [submitted, setSubmitted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const costBreakdown: CostBreakdown = useMemo(() => {
    const basePrice = formData.budgetLevel ? budgetPriceMap[formData.budgetLevel] : null;
    const timelineData = formData.timeline ? timelineMultiplierMap[formData.timeline] : null;
    const addOnsTotal = formData.addOns.reduce((sum, id) => {
      const addOn = availableAddOns.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);

    let startsAt: number | null = null;
    if (basePrice !== null) {
      const multiplier = timelineData?.multiplier ?? 1;
      startsAt = Math.round(basePrice * multiplier + addOnsTotal);
    }

    const progress = basePrice ? Math.min((basePrice / 300000) * 100, 100) : 0;

    return {
      basePrice,
      timelineMultiplier: timelineData?.label ?? null,
      selectedAddOns: addOnsTotal,
      startsAt,
      sliderProgress: progress,
    };
  }, [formData.budgetLevel, formData.timeline, formData.addOns]);

  const currentStepData = steps[currentStep - 1];

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm formData={formData} onUpdate={updateFormData} onNext={nextStep} />;
      case 2:
        return <ProjectTypeForm formData={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <TimelineForm formData={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <AddOnsForm formData={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return (
          <ReviewForm
            formData={formData}
            onPrev={prevStep}
            onEditStep={goToStep}
            onSubmit={() => {
              clearFormStorage();
              resetForm();
              setSubmitted(true);
            }}
          />
        );
      default:
        return null;
    }
  };

  const toggleAddOn = (id: string) => {
    const current = formData.addOns;
    updateFormData(
      'addOns',
      current.includes(id) ? current.filter((a) => a !== id) : [...current, id]
    );
  };

  // Format meeting display text
  const meetingDisplay = formData.selectedDate && formData.selectedTime
    ? `${formData.selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${formData.selectedTime}`
    : '';

  // Reusable sidebar content
  const sidebarContent = (
    <>
      <CostEstimate breakdown={costBreakdown} />
      <BookMeetingCard
        selectedDate={formData.selectedDate}
        onDateSelect={(date) => updateFormData('selectedDate', date)}
        selectedTime={formData.selectedTime}
        onTimeSelect={(time) => updateFormData('selectedTime', time)}
      />
      <AddOnsCard
        addOns={availableAddOns}
        selectedAddOns={formData.addOns}
        onToggleAddOn={toggleAddOn}
        projectTypeSelected={!!formData.projectType}
      />
    </>
  );

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.successWrapper}>
            <div className={styles.successInner}>
              <div className={styles.successIcon}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className={styles.successTitle}>Thank You!</h1>
              <p className={styles.successText}>
                Your project inquiry has been submitted successfully. We&apos;ll be in touch within 24–48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.layout}>
            <div className={styles.formColumn}>
              <FormSection
                currentStep={currentStep}
                totalSteps={totalSteps}
                title={currentStepData.title}
                description={currentStepData.description}
              >
                {renderForm()}
              </FormSection>
            </div>

            {/* Desktop sidebar (hidden on mobile via CSS) */}
            <div className={styles.sidebarColumn}>
              <SidebarSection>{sidebarContent}</SidebarSection>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-only sticky bottom bar */}
      <MobileSummaryBar
        breakdown={costBreakdown}
        meetingTime={meetingDisplay}
        onOpen={() => setIsSheetOpen(true)}
      />

      {/* Mobile bottom sheet drawer */}
      <MobileSummarySheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        {sidebarContent}
      </MobileSummarySheet>
    </>
  );
};

export default ContactUsSection;