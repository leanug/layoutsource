export const generateRandomSlug = () => {
  const min = 1000000; // Minimum 7-digit number
  const max = 9999999; // Maximum 7-digit number

  const randomSlug = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomSlug.toString();
};
