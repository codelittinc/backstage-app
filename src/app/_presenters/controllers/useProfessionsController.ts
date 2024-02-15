"use client";
import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getProfessions } from "../data/professions";

const useProfessionsController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Professions],
    queryFn: getProfessions,
  });

  return {
    professions: data,
    isLoading: isLoading,
  };
};

export default useProfessionsController;
