import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getSeatsRemaining(totalSeats: number, bookedSeats: number): number {
  return Math.max(0, totalSeats - bookedSeats);
}

export function getSeatsBadgeColor(remaining: number): string {
  if (remaining <= 0) return 'bg-plugin-danger/20 text-plugin-danger';
  if (remaining <= 5) return 'bg-plugin-warning/20 text-plugin-warning';
  return 'bg-plugin-success/20 text-plugin-success';
}
