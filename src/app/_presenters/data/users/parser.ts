import Profession from "@/app/_domain/interfaces/Profession";
import User from "@/app/_domain/interfaces/User";
import { fromApiParser as professionFromApiParser } from "@/app/_presenters/data/professions/parser";

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
}

export const toApiParser = (user: User): ApiUser => {
  return {
    id: user.id,
    active: user.active || false,
    contract_type: user.contractType,
    email: user.email,
    first_name: user.firstName,
    image_url: user.imageUrl,
    last_name: user.lastName,
    seniority: user.seniority,
    slug: user.slug,
    google_id: user.googleId,
    profession_id: user.profession.id,
    country: user.country,
  };
};

export const fromApiParser = (user: ApiUser): User => {
  const {
    google_id,
    email,
    first_name,
    last_name,
    slug,
    image_url,
    id,
    active,
    contract_type,
    seniority,
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
    profession: professionFromApiParser(user.profession!),
    fullName: `${first_name} ${last_name}`,
    country: user.country,
  };
};
