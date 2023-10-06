"use client";
import CustomerForm from "../_presenters/_components/CustomerForm/page";
import useNewCustomerController from "./_presenters/_controllers/useNewCustomerController";

function Page() {
  const defaultCustomer = {
    id: undefined,
    name: "",
  };

  const { onSave } = useNewCustomerController();

  return <CustomerForm customer={defaultCustomer} onSave={onSave} />;
}

export default Page;
