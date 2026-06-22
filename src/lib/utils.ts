import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskCRP(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 7)
    .replace(/(\d{2})(\d)/, '$1/$2')
}
