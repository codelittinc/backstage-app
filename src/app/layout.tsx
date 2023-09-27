import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/providers/query.provider";
import AuthProvider from "@/providers/auth.provider";
import { MaterialUIControllerProvider } from "@/theme";
import LayoutProvider from "@/providers/layout.provider";
import "material-icons/iconfont/material-icons.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codelitt Backstage",
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
            <LayoutProvider>
              <QueryProvider>{children}</QueryProvider>
            </LayoutProvider>
          </MaterialUIControllerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
