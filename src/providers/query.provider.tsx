"use client";

import { useAppStore } from "@/app/_presenters/data/store/store";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { showSaveErrorAlert } = useAppStore();
  const [client] = useState(
    new QueryClient({
      mutationCache: new MutationCache({
        onError: (error, query) => {
          showSaveErrorAlert(error);
        },
      }),
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
