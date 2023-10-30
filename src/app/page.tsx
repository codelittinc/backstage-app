"use client";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <div>
          <div>Welcome to Backstage!</div>
          <div>
            This project is under construction. See the sidebar on the left for
            actions you can already perform.
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
