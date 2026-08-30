// src/components/sections/contactus-page/utils/labels.ts
import { ProjectType, SelectOption, BudgetOption, TimelineOption, AddOn } from '../types/types';

// ─── Project Types ────────────────────────────────────────────────────────
export const projectTypes: ProjectType[] = [
  { id: 1, name: 'Business Operations System' },
  { id: 2, name: 'Inventory Management System' },
  { id: 3, name: 'E-commerce Website' },
  { id: 4, name: 'Portfolio Website' },
  { id: 5, name: 'Digital Invitation Website' },
  { id: 6, name: 'Branding and Creative Design' },
  { id: 7, name: 'System Maintenance and Care Plan' },
];

// ─── Stage & Goal Options (unchanged) ────────────────────────────────────
export const stageOptions: SelectOption[] = [
  { value: 'idea',       label: 'Just an idea' },
  { value: 'planning',   label: 'Planning stage' },
  { value: 'ready',      label: 'Ready to start' },
  { value: 'inprogress', label: 'Already in progress' },
];

export const goalOptions: SelectOption[] = [
  { value: 'presence', label: 'Establish online presence' },
  { value: 'leads',    label: 'Generate leads' },
  { value: 'sales',    label: 'Increase sales' },
  { value: 'brand',    label: 'Build brand awareness' },
];

// ─── Budget Options by Project Type ──────────────────────────────────────
// Key = ProjectType.id, Value = list of budget tiers for that service.
export const budgetOptionsByProjectType: Record<number, BudgetOption[]> = {

  // 1 — Business Operations System
  1: [
    { id: 'bos-starter',  label: 'Starter Package',  basePrice: 20000 },
    { id: 'bos-business', label: 'Business Package', basePrice: 45000 },
    { id: 'bos-premium',  label: 'Premium Package',  basePrice: 95000 },
  ],

  // 2 — Inventory Management System
  2: [
    { id: 'inv-starter',  label: 'Starter Package',  basePrice: 20000 },
    { id: 'inv-business', label: 'Business Package', basePrice: 45000 },
    { id: 'inv-premium',  label: 'Premium Package',  basePrice: 95000 },
  ],

  // 3 — E-commerce Website  (no Starter tier)
  3: [
    { id: 'ecom-business', label: 'Business Package', basePrice: 55000 },
    { id: 'ecom-premium',  label: 'Premium Package',  basePrice: 130000 },
  ],

  // 4 — Portfolio Website
  4: [
    { id: 'port-starter',  label: 'Starter Package',  basePrice: 10000 },
    { id: 'port-business', label: 'Business Package', basePrice: 20000 },
    { id: 'port-premium',  label: 'Premium Package',  basePrice: 40000 },
  ],

  // 5 — Digital Invitation Website
  5: [
    { id: 'digi-starter',  label: 'Starter Package',  basePrice: 5000 },
    { id: 'digi-business', label: 'Business Package', basePrice: 15000 },
    { id: 'digi-premium',  label: 'Premium Package',  basePrice: 30000 },
  ],

  // 6 — Branding and Creative Design
  6: [
    { id: 'brand-starter',  label: 'Starter Package',  basePrice: 3000 },
    { id: 'brand-business', label: 'Business Package', basePrice: 6000 },
    { id: 'brand-premium',  label: 'Premium Package',  basePrice: 12000 },
  ],

  // 7 — System Maintenance and Care Plan
  7: [
    { id: 'maint-monthly', label: 'Monthly Plan',  basePrice: 1500 },
    { id: 'maint-yearly',  label: 'Yearly Plan',   basePrice: 15000 },
  ],
};

// ─── Add-Ons by Project Type ─────────────────────────────────────────────
export const addOnsByProjectType: Record<number, AddOn[]> = {

  // 1 — Business Operations System
  1: [
    { id: 'bos-domain',           name: 'Website Domain (.com)',          price: 800,  priceLabel: '₱800 per year' },
    { id: 'bos-mobile-platform',  name: 'Platform | Mobile Application',  price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'bos-desktop-platform', name: 'Platform | Desktop Application', price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'bos-playstore',        name: 'Application | Google Playstore', price: 1000 },
    { id: 'bos-appstore',         name: 'Application | iOS Apple Store',  price: 5000 },
    { id: 'bos-extra-feature',    name: 'Additional Feature',             price: 2000, priceLabel: 'Starting at ₱2,000' },
    { id: 'bos-animation',        name: 'Custom Animation / Motion',      price: 3000, priceLabel: '₱3,000 / per page' },
    { id: 'bos-seo',              name: 'SEO Starter Package',            price: 3000 },
    { id: 'bos-social-kit',       name: 'Social Media Branding Kit',      price: 2500 },
  ],

  // 2 — Inventory Management System
  2: [
    { id: 'inv-domain',           name: 'Website Domain (.com)',          price: 800,  priceLabel: '₱800 per year' },
    { id: 'inv-mobile-platform',  name: 'Platform | Mobile Application',  price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'inv-desktop-platform', name: 'Platform | Desktop Application', price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'inv-playstore',        name: 'Application | Google Playstore', price: 1000 },
    { id: 'inv-appstore',         name: 'Application | iOS Apple Store',  price: 5000 },
    { id: 'inv-extra-feature',    name: 'Additional Feature',             price: 2000, priceLabel: 'Starting at ₱2,000' },
    { id: 'inv-barcode',          name: 'Barcode / QR Scanner Module',    price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'inv-seo',              name: 'SEO Starter Package',            price: 3000 },
    { id: 'inv-social-kit',       name: 'Social Media Branding Kit',      price: 2500 },
  ],

  // 3 — E-commerce Website
  3: [
    { id: 'ecom-domain',          name: 'Website Domain (.com)',          price: 800,  priceLabel: '₱800 per year' },
    { id: 'ecom-mobile-platform', name: 'Platform | Mobile Application',  price: 5000, priceLabel: 'Starting at ₱5,000' },
    { id: 'ecom-extra-page',      name: 'Additional Website Page',        price: 1500, priceLabel: '₱1,500 / per page' },
    { id: 'ecom-extra-feature',   name: 'Additional Feature',             price: 2000, priceLabel: 'Starting at ₱2,000' },
    { id: 'ecom-seo',             name: 'SEO Starter Package',            price: 3000 },
    { id: 'ecom-social-kit',      name: 'Social Media Branding Kit',      price: 2500 },
  ],

  // 4 — Portfolio Website
  4: [
    { id: 'port-domain',       name: 'Website Domain (.com)',       price: 800,  priceLabel: '₱800 per year' },
    { id: 'port-extra-page',   name: 'Additional Website Page',     price: 1500, priceLabel: '₱1,500 / per page' },
    { id: 'port-extra-feature',name: 'Additional Feature',          price: 2000, priceLabel: 'Starting at ₱2,000' },
    { id: 'port-animation',    name: 'Custom Animation / Motion',   price: 3000, priceLabel: '₱3,000 / per page' },
    { id: 'port-seo',          name: 'SEO Starter Package',         price: 3000 },
    { id: 'port-social-kit',   name: 'Social Media Branding Kit',   price: 2500 },
  ],

  // 5 — Digital Invitation Website
  5: [
    { id: 'digi-domain',       name: 'Website Domain (.com)',       price: 800,  priceLabel: '₱800 per year' },
    { id: 'digi-extra-page',   name: 'Additional Event Page',       price: 1500, priceLabel: '₱1,500 / per page' },
    { id: 'digi-animation',    name: 'Custom Animation / Motion',   price: 3000, priceLabel: '₱3,000 / per page' },
    { id: 'digi-music',        name: 'Background Music License',    price: 1000, priceLabel: '₱1,000' },
    { id: 'digi-qr-checkin',   name: 'QR Code Check-In Module',     price: 2000, priceLabel: '₱2,000' },
  ],

  // 6 — Branding and Creative Design
  6: [
    { id: 'brand-animation',   name: 'Custom Animation / Motion',   price: 3000, priceLabel: '₱3,000 / per piece' },
    { id: 'brand-social-kit',  name: 'Social Media Branding Kit',   price: 2500 },
    { id: 'brand-extra-logo',  name: 'Additional Logo Concept',     price: 1500, priceLabel: '₱1,500 / per concept' },
    { id: 'brand-extra-material', name: 'Additional Marketing Material', price: 1000, priceLabel: '₱1,000 / per piece' },
  ],

  // 7 — System Maintenance and Care Plan
  7: [
    { id: 'maint-extra-page',    name: 'Additional Website Page',   price: 1500, priceLabel: '₱1,500 / per page' },
    { id: 'maint-extra-feature', name: 'Additional Feature',        price: 2000, priceLabel: 'Starting at ₱2,000' },
    { id: 'maint-seo',           name: 'SEO Starter Package',       price: 3000 },
    { id: 'maint-backup',        name: 'Advanced Backup Setup',     price: 2000, priceLabel: '₱2,000 one-time' },
  ],
};

// ─── Helper: get budget tiers for a project type ─────────────────────────
export const getBudgetOptions = (projectTypeId: number | null): BudgetOption[] => {
  if (!projectTypeId) return [];
  return budgetOptionsByProjectType[projectTypeId] ?? [];
};

/** Flat list of ALL budget options — used by label lookup helper */
const allBudgetOptions: BudgetOption[] = Object.values(budgetOptionsByProjectType).flat();

// ─── Timeline Options (unchanged) ────────────────────────────────────────
export const timelineOptions: TimelineOption[] = [
  { id: 'asap',     label: 'Priority Project',  multiplier: 1.35, multiplierLabel: 'Rush (+35%)' },
  { id: '1month',   label: 'Within 1 Month',    multiplier: 1.15, multiplierLabel: 'Fast (+15%)' },
  { id: '3months',  label: 'Within 3 Months',   multiplier: 1,    multiplierLabel: 'Standard (1x)' },
  { id: 'flexible', label: 'Flexible',           multiplier: 1,    multiplierLabel: 'Standard (1x)' },
];

// ─── Referral Options (unchanged) ────────────────────────────────────────
export const referralOptions: SelectOption[] = [
  { value: 'Google Search',   label: 'Google Search' },
  { value: 'Facebook',        label: 'Facebook' },
  { value: 'Instagram',       label: 'Instagram' },
  { value: 'LinkedIn',        label: 'LinkedIn' },
  { value: 'Friend Referral', label: 'Friend Referral' },
  { value: 'Event',           label: 'Event' },
];

// ─── Label Helpers ───────────────────────────────────────────────────────
export const getProjectTypeLabel = (id: number | null): string =>
  id ? projectTypes.find((p) => p.id === id)?.name ?? '-' : '-';

export const getStageLabel = (value: string): string =>
  stageOptions.find((s) => s.value === value)?.label ?? '-';

export const getGoalLabel = (value: string): string =>
  goalOptions.find((g) => g.value === value)?.label ?? '-';

export const getBudgetLabel = (id: string): string =>
  allBudgetOptions.find((b) => b.id === id)?.label ?? '-';

/** Get base price from a budget id */
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

/** Get a single add-on's price from its id */
export const getAddOnPrice = (id: string): number | null =>
  allAddOns.find((a) => a.id === id)?.price ?? null;

/** Get a single add-on's name from its id */
export const getAddOnName = (id: string): string =>
  allAddOns.find((a) => a.id === id)?.name ?? '-';