// src/components/sections/contactus-page/utils/labels.ts
import { ProjectType, SelectOption, BudgetOption, TimelineOption } from '../types/types';

export const projectTypes: ProjectType[] = [
  { id: 'app-dev', name: 'System Development' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'mobile-app', name: 'Mobile App' },
  { id: 'ecommerce', name: 'E-Commerce' },
  { id: 'branding', name: 'Branding & Design' },
  { id: 'other', name: 'Other' },
];

export const stageOptions: SelectOption[] = [
  { value: 'idea', label: 'Just an idea' },
  { value: 'planning', label: 'Planning stage' },
  { value: 'ready', label: 'Ready to start' },
  { value: 'inprogress', label: 'Already in progress' },
];

export const goalOptions: SelectOption[] = [
  { value: 'presence', label: 'Establish online presence' },
  { value: 'leads', label: 'Generate leads' },
  { value: 'sales', label: 'Increase sales' },
  { value: 'brand', label: 'Build brand awareness' },
];

export const budgetOptions: BudgetOption[] = [
  { id: 'starting', label: 'Just Starting Out', basePrice: 20000 },
  { id: 'small', label: 'Small Project', basePrice: 40000 },
  { id: 'mid', label: 'Mid-Scale Project', basePrice: 80000 },
  { id: 'large', label: 'Large Project', basePrice: 150000 },
  { id: 'enterprise', label: 'Enterprise / No Limit', basePrice: 300000 },
];

export const timelineOptions: TimelineOption[] = [
  { id: 'asap', label: 'ASAP', multiplier: 1.35, multiplierLabel: 'Rush (+35%)' },
  { id: '1month', label: 'Within 1 Month', multiplier: 1.15, multiplierLabel: 'Fast (+15%)' },
  { id: '3months', label: 'Within 3 Months', multiplier: 1, multiplierLabel: 'Standard (1x)' },
  { id: 'flexible', label: 'Flexible', multiplier: 0.9, multiplierLabel: 'Relaxed (-10%)' },
];

export const referralOptions: SelectOption[] = [
  { value: 'google', label: 'Google Search' },
  { value: 'social', label: 'Social Media' },
  { value: 'friend', label: 'Friend / Referral' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' },
];

// Helper functions to get labels by ID
export const getProjectTypeLabel = (id: string): string =>
  projectTypes.find((p) => p.id === id)?.name || '-';

export const getStageLabel = (value: string): string =>
  stageOptions.find((s) => s.value === value)?.label || '-';

export const getGoalLabel = (value: string): string =>
  goalOptions.find((g) => g.value === value)?.label || '-';

export const getBudgetLabel = (id: string): string =>
  budgetOptions.find((b) => b.id === id)?.label || '-';

export const getTimelineLabel = (id: string): string =>
  timelineOptions.find((t) => t.id === id)?.label || '-';

export const getReferralLabel = (value: string): string =>
  referralOptions.find((r) => r.value === value)?.label || '-';