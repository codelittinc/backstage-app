import Profession from "./Profession";

export default interface User {
  id?: number;
  active?: boolean;
  contractType?: string;
  email: string;
  firstName: string;
  imageUrl: string;
  lastName: string;
  seniority?: string;
  slug: string;
  googleId: string;
  profession: Profession;
  fullName: string;
  country: string;
}
