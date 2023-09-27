"use client";
import { useEffect, ReactNode } from "react";
import Box from "@/components/Box";
import { useMaterialUIController, setLayout } from "@/theme";

interface Props {
  background?: "white" | "light" | "default";
  children: ReactNode;
}

function PageLayout({ background = "default", children }: Props): JSX.Element {
  const [, dispatch] = useMaterialUIController();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [dispatch]);

  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </Box>
  );
}

export default PageLayout;
