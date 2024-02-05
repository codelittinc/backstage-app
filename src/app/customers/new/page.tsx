"use client";
import useNewCustomerController from "./_presenters/controllers/useNewCustomerController";
import CustomerForm from "../_presenters/components/CustomerForm/page";

function Page() {
  const { onSave } = useNewCustomerController();

  return <CustomerForm onSave={onSave} />;
}

export default Page;
