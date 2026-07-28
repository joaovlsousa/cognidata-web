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

export function maskPhone(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export function compareObjectValues<T extends object>(
  objA: T,
  objB: T,
  keys?: (keyof T)[]
): boolean {
  if (keys) {
    return keys.every((key) => objA[key] === objB[key])
  }

  const objKeys = Object.keys(objA) as (keyof T)[]

  return objKeys.every((key) => objA[key] === objB[key])
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
