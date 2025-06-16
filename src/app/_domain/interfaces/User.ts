import Permission from "./Permission";
import { ApiServiceIdentifier, ServiceIdentifier } from "./ServiceIdentifier";
import { Skill, UserSkill } from "./Skill";

export type User = {
  active?: boolean;
  contractType?: string;
  country: string;
  email: string;
  firstName: string;
  fullName: string;
  googleId: string;
  history?: string;
  id?: number | string;
  imageUrl: string;
  internal: boolean;
  lastName: string;
  permissions: Permission[];
  professionId?: number;
  seniority?: string;
  servicesIdentifiers: ServiceIdentifier[];
  skills: Skill[];
  slug: string;
  userSkills: UserSkill[];
};

export type ApiUser = {
  active: boolean;
  contract_type?: string;
  country: string;
  email: string;
  first_name: string;
  google_id: string;
  history?: string;
  id?: number;
  image_url: string;
  internal: boolean;
  last_name: string;
  permissions: Permission[];
  profession_id?: number;
  seniority?: string;
  skills: Skill[];
  slug: string;
  user_service_identifiers: ApiServiceIdentifier[];
  user_skills: UserSkill[];
};

export type ToApiUser = {
  user_service_identifiers_attributes: {
    id?: number;
    service_name: string;
    identifier: string;
    customer_id: number;
  }[];
} & Omit<
  ApiUser,
  "user_service_identifiers" | "slug" | "permissions" | "skills"
>;

export type FromApiUser = {} & ApiUser;
