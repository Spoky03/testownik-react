import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function checkIfTokenIsValid(exp: number) {
  return exp * 1000 > Date.now()
}
