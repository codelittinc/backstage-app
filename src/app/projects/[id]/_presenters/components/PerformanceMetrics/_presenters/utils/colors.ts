function generateRandomColor(): string {
  // Generate a random number between 0 and 0xFFFFFF (16777215 in decimal)
  // Then convert that number to a hexadecimal string and pad with leading zeros if necessary
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}

export const getChartItemColor = (index: number): string => {
  const colors = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ];

  if (index >= colors.length) {
    return generateRandomColor();
  }

  return colors[index];
};
