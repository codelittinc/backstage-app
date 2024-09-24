import skillLevelKeys from '@/app/_domain/enums/skillLevelKeys';

export const LEVEL_LIST = [
  `${skillLevelKeys.Beginner}`,
  `${skillLevelKeys.Intermediate}`,
  `${skillLevelKeys.Advanced}`,
];

const currentYear = new Date().getFullYear();
const startYear = currentYear - 10;

export const LAST_APPLIED_YEARS = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => startYear + index
);
