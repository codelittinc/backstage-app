"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useRepositoryController from "./_presenters/controllers/useRepositoryController";
import RepositoryForm from "../_presenters/components/RepositoryForm/page";

function Page(): JSX.Element {
  const { id } = useParams();
  const { isLoading, repository } = useRepositoryController(id as string);

  if (isLoading) {
    return <Loading />;
  }

  return <RepositoryForm repository={repository!} />;
}

export default Page;
