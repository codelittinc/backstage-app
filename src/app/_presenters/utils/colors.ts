function seededRandom(seed: number): number {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandomColor(seed: number, index: number): string {
  var r = Math.floor(seededRandom(seed + index) * 256);
  var g = Math.floor(seededRandom(seed + index + 1) * 256);
  var b = Math.floor(seededRandom(seed + index + 2) * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export function generateColorList(n: number): string[] {
  let colors: string[] = [];
  for (let i = 0; i < n; i++) {
    colors.push(getRandomColor(n, i));
  }
  return colors;
}
