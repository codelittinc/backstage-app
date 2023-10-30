import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "@/providers/auth.provider";
import LayoutProvider from "@/providers/layout.provider";
import QueryProvider from "@/providers/query.provider";
import { MaterialUIControllerProvider } from "@/theme";
import "material-icons/iconfont/material-icons.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Backstage - Codelitt",
  description: "Our Codelitt everything app!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MaterialUIControllerProvider>
            <QueryProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </QueryProvider>
          </MaterialUIControllerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
