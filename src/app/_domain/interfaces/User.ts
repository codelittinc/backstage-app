import Permission from "./Permission";
import Profession from "./Profession";
import { ServiceIdentifier } from "./ServiceIdentifier";

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
  servicesIdentifiers: ServiceIdentifier[];
  permissions: Permission[];
}
