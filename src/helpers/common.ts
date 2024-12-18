import { API_BASE_URL } from "@/constants/common";

export const getImagePath = (absoluteUrl: string) => {
  if(!API_BASE_URL || !absoluteUrl) return '';
  return `${API_BASE_URL}${absoluteUrl}`;
};
