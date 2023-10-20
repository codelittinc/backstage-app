"use client";
import { useParams } from "next/navigation";
import CustomerForm from "../_presenters/components/CustomerForm/page";
import useNewCustomerController from "./_presenters/controllers/useCustomerController";
import Loading from "@/components/Loading";

function Page() {
  const { id } = useParams();

  const { customer, isLoading, onSave } = useNewCustomerController(id);

  if (isLoading) {
    return <Loading />;
  }
  return <CustomerForm customer={customer} onSave={onSave} />;
}

export default Page;
