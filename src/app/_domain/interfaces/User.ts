import Permission from "./Permission";
import Profession from "./Profession";
import { ServiceIdentifier } from "./ServiceIdentifier";

export default interface User {
  active?: boolean;
  contractType?: string;
  country: string;
  email: string;
  firstName: string;
  fullName: string;
  googleId: string;
  id?: number;
  imageUrl: string;
  lastName: string;
  permissions: Permission[];
  profession: Profession;
  seniority?: string;
  servicesIdentifiers: ServiceIdentifier[];
  slug: string;
}
