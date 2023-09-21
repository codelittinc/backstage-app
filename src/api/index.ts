export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getUrl = (path: string): string => `${API_URL}/${path}`;

export const ROADRUNNER_API_URL = process.env.NEXT_PUBLIC_ROADRUNNER_API_URL;
export const getRoadrunnerUrl = (path: string): string =>
  `${ROADRUNNER_API_URL}/${path}`;
