import Permission from "./Permission";
import Profession from "./Profession";
import { ApiServiceIdentifier, ServiceIdentifier } from "./ServiceIdentifier";

export type User = {
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
};

type ApiUser = {
  active: boolean;
  contract_type?: string;
  country: string;
  email: string;
  first_name: string;
  google_id: string;
  id?: number;
  image_url: string;
  last_name: string;
  permissions: Permission[];
  profession?: Profession | undefined;
  profession_id?: number;
  seniority?: string;
  slug: string;
  user_service_identifiers: ApiServiceIdentifier[];
};

export type ToApiUser = {
  user_service_identifiers_attributes: ApiServiceIdentifier[];
} & Omit<ApiUser, "user_service_identifiers" | "slug" | "permissions">;

export type FromApiUser = {} & ApiUser;
