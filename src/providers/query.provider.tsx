"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

import { useAppStore } from "@/app/_presenters/data/store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { showSaveErrorAlert } = useAppStore();
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          showSaveErrorAlert(error);
        },
      }),
      mutationCache: new MutationCache({
        onError: (error, query) => {
          showSaveErrorAlert(error);
        },
      }),
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
