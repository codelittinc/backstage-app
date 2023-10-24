import Permission from "@/app/_domain/interfaces/Permission";
import Profession from "@/app/_domain/interfaces/Profession";
import User from "@/app/_domain/interfaces/User";
import { fromApiParser as professionFromApiParser } from "@/app/_presenters/data/professions/parser";
import { fromApiParser as customerFromApiParser } from "@/app/customers/_presenters/data/services/customers/parser";

export interface ApiUser {
  id?: number;
  active: boolean;
  contract_type?: string;
  email: string;
  first_name: string;
  image_url: string;
  last_name: string;
  seniority?: string;
  slug: string;
  google_id: string;
  profession?: Profession;
  profession_id?: number;
  country: string;
  user_service_identifiers: {
    service_name: string;
    identifier: string;
    customer?: Customer;
    customer_id?: number;
    id?: number;
  }[];
  permissions: Permission[];
}

export const toApiParser = (user: User): ApiUser => {
  return {
    active: user.active || false,
    contract_type: user.contractType,
    email: user.email,
    first_name: user.firstName,
    image_url: user.imageUrl,
    last_name: user.lastName,
    seniority: user.seniority,
    google_id: user.googleId,
    profession_id: user.profession.id,
    country: user.country,
    user_service_identifiers_attributes: user.servicesIdentifiers.map(
      (service) => {
        return {
          id: service.id,
          service_name: service.serviceName,
          identifier: service.identifier,
          customer_id: service.customer.id,
        };
      }
    ),
  };
};

export const fromApiParser = (user: ApiUser): User => {
  const {
    id,
    google_id,
    email,
    first_name,
    last_name,
    slug,
    image_url,
    active,
    contract_type,
    seniority,
    country,
    profession,
    user_service_identifiers,
  } = user;
  return {
    id: id,
    active: active,
    contractType: contract_type,
    email: email,
    firstName: first_name,
    lastName: last_name,
    imageUrl: image_url,
    seniority: seniority,
    slug: slug,
    googleId: google_id,
    profession: profession?.id
      ? professionFromApiParser(profession)
      : undefined,
    fullName: `${first_name} ${last_name}`,
    country: country,
    servicesIdentifiers: user_service_identifiers.map((service) => ({
      id: service.id,
      customer: customerFromApiParser(service.customer),
      serviceName: service.service_name,
      identifier: service.identifier,
    })),
    permissions: user.permissions,
  };
};
