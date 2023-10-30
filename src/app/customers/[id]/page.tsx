"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useNewCustomerController from "./_presenters/controllers/useCustomerController";
import CustomerForm from "../_presenters/components/CustomerForm/page";

function Page() {
  const { id } = useParams();

  const { customer, isLoading, onSave } = useNewCustomerController(id);

  if (isLoading) {
    return <Loading />;
  }
  return <CustomerForm customer={customer} onSave={onSave} />;
}

export default Page;
