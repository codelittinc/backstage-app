"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useUpdateCustomerController from "./_presenters/controllers/useUpdateCustomerController";
import CustomerForm from "../_presenters/components/CustomerForm/page";

function Page() {
  const { id } = useParams();

  const { customer, isLoading, onSave } = useUpdateCustomerController(
    id as string
  );

  if (isLoading) {
    return <Loading />;
  }
  return <CustomerForm customer={customer} onSave={onSave} />;
}

export default Page;
