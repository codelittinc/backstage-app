"use client";
import { useParams } from "next/navigation";
import CustomerForm from "../_presenters/_components/CustomerForm/page";
import useNewCustomerController from "./_presenters/_controllers/useCustomerController";
import Loading from "@/components/Loading";

function Page() {
  const { id } = useParams();

  const { customer, isLoading, onSave } = useNewCustomerController(Number(id));

  if (isLoading) {
    return <Loading />;
  }
  return <CustomerForm customer={customer} onSave={onSave} />;
}

export default Page;
