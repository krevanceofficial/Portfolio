// src/types/types.ts
export interface FormData {
  // Step 1
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  
  // Step 2
  projectType: string;
  projectStage: string;
  primaryGoal: string;
  
  // Step 3
  budgetLevel: string;
  timeline: string;
  referral: string;
  
  // Step 4
  projectName: string;
  projectDescription: string;
  
  // Sidebar
  selectedDate: Date | null;
  selectedTime: string;
  addOns: string[];
}

export interface CountryCode {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface CostBreakdown {
  basePrice: number | null;
  timelineMultiplier: string | null;
  selectedAddOns: number;
  startsAt: number | null;
  sliderProgress: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface ProjectType {
  id: string;
  name: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface BudgetOption {
  id: string;
  label: string;
  basePrice: number;
}

export interface TimelineOption {
  id: string;
  label: string;
  multiplier: number;
  multiplierLabel: string;
}