export const avg = (array: number[]) => {
  // Calculate average number of elements in arrays
  return Math.floor(array.reduce((a, b) => a + b, 0) / array.length);
};
export const min = (array: number[]) => {
  // Calculate lowest number of elemnts in arrays
  return Math.min(...array);
};
export const max = (array: number[]) => {
  // Calculate highest number of elements in arrays
  return Math.max(...array);
};
