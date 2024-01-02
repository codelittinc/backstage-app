"use client";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import SidenavForm from "@/components/SidenavForm";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function FormLayout({ children }: Props): JSX.Element {
  return (
    <DashboardLayout>
      <SidenavForm>{children}</SidenavForm>
    </DashboardLayout>
  );
}

export default FormLayout;
