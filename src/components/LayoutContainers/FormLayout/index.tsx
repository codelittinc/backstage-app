"use client";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import SidenavForm from "@/components/SidenavForm";

interface Props {
  children: JSX.Element[] | JSX.Element;
  sidebarItems: { href: string, icon: string; label: string; }[];
}
function FormLayout({ children, sidebarItems }: Props): JSX.Element {
  return (
    <DashboardLayout>
      <SidenavForm sidebarItems={sidebarItems}>{children}</SidenavForm>
    </DashboardLayout>
  );
}

export default FormLayout;
