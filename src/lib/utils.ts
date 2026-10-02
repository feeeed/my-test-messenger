import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// мердж стилей
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}