"use client";
import { useQuery } from "@tanstack/react-query";

import { PROFESSIONS_KEY } from "@/app/_domain/constants";

import { getProfessions } from "../data/professions";

const useProfessionsController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [PROFESSIONS_KEY],
    queryFn: getProfessions,
  });

  return {
    professions: data,
    isLoading: isLoading,
  };
};

export default useProfessionsController;
