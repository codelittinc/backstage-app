"use client";
import CustomerForm from "../_presenters/components/CustomerForm/page";
import useNewCustomerController from "./_presenters/controllers/useNewCustomerController";

function Page() {
  const defaultCustomer = {
    id: undefined,
    name: "",
    sourceControlToken:
      process.env.NEXT_PUBLIC_DEFAULT_CUSTOMER_SOURCE_CONTROL_TOKEN,
    notificationsToken:
      process.env.NEXT_PUBLIC_DEFAULT_CUSTOMER_NOTIFICATIONS_TOKEN,
  };

  const { onSave } = useNewCustomerController();

  return <CustomerForm customer={defaultCustomer} onSave={onSave} />;
}

export default Page;
