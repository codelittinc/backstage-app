import Profession from "@/app/_domain/interfaces/Profession";

export interface ApiProfession {
  id: number;
  name: string;
}

export const toApiParser = (profession: Profession): ApiProfession => {
  return {
    id: profession.id,
    name: profession.name,
  };
};

export const fromApiParser = (apiProfession: ApiProfession): Profession => {
  const { id, name } = apiProfession;

  return {
    id: id,
    name: name,
  };
};
