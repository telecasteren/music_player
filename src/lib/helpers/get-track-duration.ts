export const getTrackDuration = (filePath: string): number => {
  const { duration } = new Audio(filePath);
  return duration;
};
