export type UserSkill = {
  id?: number;
  lastAppliedInYear: number;
  level: "advanced" | "intermediate" | "beginner";
  yearsOfExperience: number;
};

type PExtract<T, U> = T extends U ? T : never;

type Car = {
  make: string;
  model: string;
  year: number;
  vin: string;
};

type Truck = {
  make: string;
  model: string;
  year: number;
  capacity: number;
};
