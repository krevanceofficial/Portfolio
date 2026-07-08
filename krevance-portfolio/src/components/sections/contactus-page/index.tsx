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
import Button from './ui/Button';
import { useMultiStepForm, clearFormStorage } from './hooks/useMultiStepForm';
import { AddOn, CostBreakdown, Step } from './types/types';
import { getBudgetPrice, getAddOns, getAddOnName  } from './utils/labels';               // ← ADDED
import styles from '../../../styles/contactus.module.css';
import MobileSummarySheet from './MobileSummarySheet';
import MobileSummaryBar from './MobileSummaryBar';

// ─── 5 numbered steps — booking happens AFTER review, unnumbered ────────────
const steps: Step[] = [
  {
    number: 1,
    title: 'Tell Us About Yourself',
    description: "Let's start with the basics so we know how to reach you.",
  },
  {
    number: 2,
    title: "What's Your Project About?",
    description: "Help us understand what you're looking to build.",
  },
  {
    number: 3,
    title: 'Project Scope',
    description: "Let's align the project with your goals and budget.",
  },
  {
    number: 4,
    title: 'Share Your Vision',
    description: 'Tell us anything that can help us better understand your project.',
  },
  {
    number: 5,
    title: 'Review & Submit',
    description: "We'll review your details and get back to you within 24–48 hours.",
  },
];

// ─── Static data ──────────────────────────────────────────────────────────────
// const availableAddOns: AddOn[] = [
//   { id: 'webpage',  name: 'Additional web page',       price: 1500 },
//   { id: 'features', name: 'Additional features',       price: 1500 },
//   { id: 'seo',      name: 'SEO starter pack',          price: 4500 },
//   { id: 'social',   name: 'Social media branding kit', price: 1500 },
// ];

// ❌ REMOVED — budgetPriceMap is no longer needed.
// Budget pricing now comes from getBudgetPrice() in labels.ts,
// which is dependent on the selected project type.

  const timelineMultiplierMap: Record<string, { multiplier: number; label: string }> = {
    ASAP:      { multiplier: 1.35, label: 'Rush (+40%)'    },
    '1month':  { multiplier: 1.15, label: 'Fast (+20%)'    },
    '3months': { multiplier: 1,    label: 'Standard (1x)'  },
    flexible:  { multiplier: 1,  label: 'Standard (1x)' }, // ← also fixed duplicate label bug
  };


  // ─── Shared chevron icons ─────────────────────────────────────────────────────
  const ChevronRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

// ─── Main component ───────────────────────────────────────────────────────────
const ContactUsSection: React.FC = () => {
  const {
    currentStep,
    formData,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    resetForm,
    totalSteps,
  } = useMultiStepForm(5);

  const [submitted,   setSubmitted]   = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);

  const availableAddOns = useMemo(
      () => getAddOns(formData.projectType),
      [formData.projectType]
    );

  // ─── Cost breakdown ───────────────────────────────────────────────────────
  const costBreakdown: CostBreakdown = useMemo(() => {
    const basePrice    = formData.budgetLevel ? getBudgetPrice(formData.budgetLevel) : null;
    const timelineData = formData.timeline    ? timelineMultiplierMap[formData.timeline] : null;

    // Only sum add-ons that still exist for the current project type
    const addOnsTotal = formData.addOns.reduce((sum, id) => {
      const addOn = availableAddOns.find((a) => a.id === id);
      return sum + (addOn?.price ?? 0);
    }, 0);

    let startsAt: number | null = null;
    if (basePrice !== null) {
      startsAt = Math.round(basePrice * (timelineData?.multiplier ?? 1) + addOnsTotal);
    }

    return {
      basePrice,
      timelineMultiplier: timelineData?.label ?? null,
      selectedAddOns:     addOnsTotal,
      startsAt,
      sliderProgress:     basePrice ? Math.min((basePrice / 300000) * 100, 100) : 0,
    };
  }, [formData.budgetLevel, formData.timeline, formData.addOns, availableAddOns]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const toggleAddOn = (id: string) => {
    const current = formData.addOns;
    updateFormData(
      'addOns',
      current.includes(id) ? current.filter((a) => a !== id) : [...current, id],
    );
  };


  const meetingDisplay =
    formData.selectedDate && formData.selectedTime
      ? `${formData.selectedDate.toLocaleDateString('en-US', {
          month: 'short',
          day:   'numeric',
        })} · ${formData.selectedTime}`
      : '';

  const handleContinueToBooking = () => {
    setShowBooking(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          costBreakdown,
          meetingDisplay,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry');
      }

      // ✅ Success
      clearFormStorage();
      resetForm();
      setShowBooking(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToReview = () => {
    setShowBooking(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Step renderer ────────────────────────────────────────────────────────
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ProjectTypeForm
            formData={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <TimelineForm
            formData={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <AddOnsForm
            formData={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <ReviewForm
            formData={formData}
            onPrev={prevStep}
            onEditStep={goToStep}
            onSubmit={handleContinueToBooking}
          />
        );
      default:
        return null;
    }
  };

  // ─── Sidebar ────────────────────────────────────────────────────────────
  const sidebarContent = (
    <>
      <CostEstimate breakdown={costBreakdown} />

      <AddOnsCard
        addOns={availableAddOns}
        selectedAddOns={formData.addOns}
        onToggleAddOn={toggleAddOn}
        projectTypeSelected={!!formData.projectType}
      />
    </>
  );

  // ─── Success screen ─────────────────────────────────────────────────────
  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.successWrapper}>
            <div className={styles.successInner}>
              <div className={styles.successIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className={styles.successTitle}>Thank You!</h1>
              <p className={styles.successText}>
                Your project inquiry has been submitted successfully.
                We&apos;ll be in touch within 24–48 hours.
              </p>
              <p className={styles.successText} style={{ marginTop: 12, fontSize: 14 }}>
                A confirmation email has been sent to your inbox.
                Please check your spam or junk folder if you haven&apos;t received it.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── Booking screen ─────────────────────────────────────────────────────
  if (showBooking) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.bookingLayout}>
            <BookingScreen
              selectedDate={formData.selectedDate}
              selectedTime={formData.selectedTime}
              onDateSelect={(date) => updateFormData('selectedDate', date)}
              onTimeSelect={(time) => updateFormData('selectedTime', time)}
              onBack={handleBackToReview}
              onConfirm={handleFinalSubmit}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          </div>
        </div>
      </section>
    );
  }

  // ─── Main multi-step form render ───────────────────────────────────────
  const currentStepData = steps[currentStep - 1];

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

            <div className={styles.sidebarColumn}>
              <SidebarSection>{sidebarContent}</SidebarSection>
            </div>

          </div>
        </div>
      </section>

      <MobileSummaryBar
        breakdown={costBreakdown}
        meetingTime={meetingDisplay}
        onOpen={() => setIsSheetOpen(true)}
      />

      <MobileSummarySheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        {sidebarContent}
      </MobileSummarySheet>
    </>
  );
};

export default ContactUsSection;

// ─── BookingScreen ──────────────────────────────────────────────────────────
interface BookingScreenProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

const BookingScreen: React.FC<BookingScreenProps> = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onBack,
  onConfirm,
  isSubmitting = false,
  submitError = null,
}) => {
  const hasDate = !!selectedDate;
  const hasTime = !!selectedTime;
  const hasSelection = hasDate && hasTime;

  const buttonLabel = isSubmitting
    ? 'Sending...'
    : !hasDate
    ? 'Select a Date First'
    : !hasTime
    ? 'Select a Time'
    : 'Confirm & Submit';

  return (
    <div className={styles.bookingScreen}>
       <BookMeetingCard
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
        />

      {submitError && (
        <p className={styles.errorText}>⚠️ {submitError}</p>
      )}

      {!hasSelection && !submitError && (
        <p className={styles.dateRequiredHint}>
          {!hasDate ? 'Please select a date to continue.' : 'Please select a time to continue.'}
        </p>
      )}

      <hr className={styles.divider} />

      <div className={styles.actions}>
        <Button
          variant="outline"
          onClick={onBack}
          icon={<ChevronLeft />}
          iconPosition="left"
          disabled={isSubmitting}
        >
          Back to Review
        </Button>
        <Button
          onClick={onConfirm}
          icon={<ChevronRight />}
          fullWidth
          disabled={!hasSelection || isSubmitting}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};