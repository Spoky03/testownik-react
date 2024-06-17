import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function checkIfTokenIsValid(token: string) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  return decodedToken.exp * 1000 > Date.now();
}