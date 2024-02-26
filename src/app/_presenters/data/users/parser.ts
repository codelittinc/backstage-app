import { ApiServiceIdentifier } from "@/app/_domain/interfaces/ServiceIdentifier";
import { FromApiUser, ToApiUser, User } from "@/app/_domain/interfaces/User";
import { fromApiParser as professionFromApiParser } from "@/app/_presenters/data/professions/parser";
import { fromApiParser as customerFromApiParser } from "@/app/customers/_presenters/data/services/customers/parser";

export const toApiParser = (user: User): ToApiUser => {
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
    internal: user.internal,
    user_service_identifiers_attributes: user.servicesIdentifiers?.map(
      (service) => {
        return {
          id: service.id,
          service_name: service.serviceName,
          identifier: service.identifier,
          customer_id: service.customer.id!,
        };
      }
    ),
  };
};

export const fromApiParser = (user: FromApiUser): User => {
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
    profession: profession ?? professionFromApiParser(profession!),
    fullName: `${first_name} ${last_name}`,
    country: country,
    internal: user.internal,
    servicesIdentifiers: user_service_identifiers.map(
      (service: ApiServiceIdentifier) => ({
        id: service.id,
        customer: customerFromApiParser(service.customer),
        serviceName: service.service_name,
        identifier: service.identifier,
      })
    ),
    permissions: user.permissions,
  };
};
