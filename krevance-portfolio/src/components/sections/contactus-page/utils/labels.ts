// src/components/sections/contactus-page/utils/labels.ts
import { ProjectType, SelectOption, BudgetOption, TimelineOption, AddOn } from '../types/types';

export const projectTypes: ProjectType[] = [
  { id: 1, name: 'System Development' },
  { id: 4, name: 'E-Commerce Systems' },
  { id: 5, name: 'Branding & Digital Creative' },
  { id: 6, name: 'Monthly Website Maintenance' },
];

export const stageOptions: SelectOption[] = [
  { value: 'idea',        label: 'Just an idea' },
  { value: 'planning',    label: 'Planning stage' },
  { value: 'ready',       label: 'Ready to start' },
  { value: 'inprogress',  label: 'Already in progress' },
];

export const goalOptions: SelectOption[] = [
  { value: 'presence', label: 'Establish online presence' },
  { value: 'leads',    label: 'Generate leads' },
  { value: 'sales',    label: 'Increase sales' },
  { value: 'brand',    label: 'Build brand awareness' },
];

// ─── Budget options are now dependent on the selected project type ─────────
// Key = ProjectType.id, Value = list of budget tiers for that service.
export const budgetOptionsByProjectType: Record<number, BudgetOption[]> = {
  // 1 — System Development
  1: [
    { id: 'sys-starter',  label: 'Starter Project',  basePrice: 15000 },
    { id: 'sys-business', label: 'Business Project', basePrice: 40000 },
    { id: 'sys-premium',  label: 'Premium Project',  basePrice: 95000 },
  ],

  // 4 — E-Commerce Systems
  4: [
    { id: 'ecom-business', label: 'Business Project', basePrice: 50000 },
    { id: 'ecom-premium',  label: 'Premium Project',  basePrice: 120000 },
  ],

  // 5 — Branding & Digital Creative
  5: [
    { id: 'brand-starter',  label: 'Starter Project',  basePrice: 2500 },
    { id: 'brand-business', label: 'Business Project', basePrice: 3500 },
    { id: 'brand-premium',  label: 'Premium Project',  basePrice: 7500 },
  ],

  // 6 — Monthly Website Maintenance
  6: [
    { id: 'maint-starter', label: 'Starter Project (per month)', basePrice: 3000 },
  ],
};

export const addOnsByProjectType: Record<number, AddOn[]> = {
  // 1 — System Development
  1: [
    { id: 'sys-domain',          name: 'Website Domain (.com)',           price: 1100, priceLabel: '₱800 per year' },
    { id: 'sys-mobile-platform', name: 'Platform | Mobile Application',   price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'sys-desktop-platform',name: 'Platform | Desktop Application',  price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'sys-playstore',       name: 'Application | Google Playstore',  price: 1000 },
    { id: 'sys-appstore',        name: 'Application | iOS Apple Store',   price: 5000 },
    { id: 'sys-extra-page',      name: 'Additional Website Page',         price: 1500, priceLabel: '₱1,500 / per page' },
    { id: 'sys-extra-feature',   name: 'Additional Feature',              price: 2000, priceLabel: 'Starting at ₱2,000' },
    { id: 'sys-animation',       name: 'Custom Animation / Motion',       price: 3000, priceLabel: '₱3,000 / per page' },
    { id: 'sys-seo',             name: 'SEO Starter Project',             price: 3000 },
    { id: 'sys-social-kit',      name: 'Social Media Branding Kit',       price: 2500 },
  ],

  // 4 — E-Commerce Systems
  4: [
    { id: 'ecom-domain',         name: 'Website Domain (.com)',           price: 1100, priceLabel: '₱1,100 per year' },
    { id: 'ecom-mobile-platform',name: 'Platform | Mobile Application',   price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'ecom-extra-page',     name: 'Additional Website Page',         price: 1500, priceLabel: '₱1,500 / per page' },
    { id: 'ecom-extra-feature',  name: 'Additional Feature',              price: 2000, priceLabel: 'Starting at ₱2,000' },
    { id: 'ecom-seo',            name: 'SEO Starter Project',             price: 3000 },
    { id: 'ecom-social-kit',     name: 'Social Media Branding Kit',       price: 2500 },
  ],

  // 5 — Branding & Digital Creative
  5: [
    { id: 'brand-animation',   name: 'Custom Animation / Motion', price: 3000, priceLabel: '₱3,000 / per page' },
    { id: 'brand-social-kit',  name: 'Social Media Branding Kit', price: 2500 },
  ],

  // 6 — Monthly Website Maintenance
  6: [
    { id: 'maint-extra-page',    name: 'Additional Website Page', price: 1500, priceLabel: '₱1,500 / per page' },
    { id: 'maint-extra-feature', name: 'Additional Feature',      price: 2000, priceLabel: 'Starting at ₱2,000' },
  ],
};

/**
 * Get the budget tier list for a given project type.
 * Returns [] if project type isn't selected yet.
 */
export const getBudgetOptions = (projectTypeId: number | null): BudgetOption[] => {
  if (!projectTypeId) return [];
  return budgetOptionsByProjectType[projectTypeId] ?? [];
};

/** Flat list of ALL budget options — used by label lookup helper */
const allBudgetOptions: BudgetOption[] = Object.values(budgetOptionsByProjectType).flat();

export const timelineOptions: TimelineOption[] = [
  { id: 'asap',      label: 'ASAP (Priority Project)', multiplier: 1.35, multiplierLabel: 'Rush (+40%)'    },
  { id: '1month',    label: 'Within 1 Month', multiplier: 1.15, multiplierLabel: 'Fast (+20%)'    },
  { id: '3months',   label: 'Within 3 Months', multiplier: 1,    multiplierLabel: 'Standard (1x)'  },
  { id: 'flexible',  label: 'Flexible', multiplier: 1,  multiplierLabel: 'Standard (1x)' },
];

export const referralOptions: SelectOption[] = [
  { value: 'Google Search',  label: 'Google Search' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram',  label: 'Instagram' },
  { value: 'LinkedIn',  label: 'LinkedIn' },
  { value: 'Friend Referral',  label: 'Friend Referral' },
  { value: 'Event',  label: 'Event' },
];

// ─── Label helpers ───────────────────────────────────────────────────────
export const getProjectTypeLabel = (id: number | null): string =>
  id ? projectTypes.find((p) => p.id === id)?.name ?? '-' : '-';

export const getStageLabel = (value: string): string =>
  stageOptions.find((s) => s.value === value)?.label ?? '-';

export const getGoalLabel = (value: string): string =>
  goalOptions.find((g) => g.value === value)?.label ?? '-';

export const getBudgetLabel = (id: string): string =>
  allBudgetOptions.find((b) => b.id === id)?.label ?? '-';

/** Get base price from a budget id — replaces the old `budgetPriceMap` */
export const getBudgetPrice = (id: string): number | null =>
  allBudgetOptions.find((b) => b.id === id)?.basePrice ?? null;

export const getTimelineLabel = (id: string): string =>
  timelineOptions.find((t) => t.id === id)?.label ?? '-';

export const getReferralLabel = (value: string): string =>
  referralOptions.find((r) => r.value === value)?.label ?? '-';

export const getAddOns = (projectTypeId: number | null): AddOn[] => {
  if (!projectTypeId) return [];
  return addOnsByProjectType[projectTypeId] ?? [];
};

/** Flat list of ALL add-ons — used by lookup helpers */
const allAddOns: AddOn[] = Object.values(addOnsByProjectType).flat();

/** Get a single add-on's price from its id (safe against invalid ids) */
export const getAddOnPrice = (id: string): number | null =>
  allAddOns.find((a) => a.id === id)?.price ?? null;

/** Get a single add-on's name from its id */
export const getAddOnName = (id: string): string =>
  allAddOns.find((a) => a.id === id)?.name ?? '-';