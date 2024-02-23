export const truncate = (value: string, size: number): string => {
  if (value.length <= size) {
    return value;
  }

  return value.slice(0, size - 3) + "...";
};
