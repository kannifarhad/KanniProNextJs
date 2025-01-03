export const slugify = (text: string): string => {
  return text
    .toString() // Ensure the input is a string
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove multiple consecutive hyphens
};