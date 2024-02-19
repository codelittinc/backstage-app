"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import { useAppStore } from "@/app/_presenters/data/store/store";

export type ApiError = Record<string, string[]>;
const unknownApiError: ApiError = {
  unknownError: ["Unkown error. Contact your administrator."],
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const { showSaveErrorAlert } = useAppStore();
  const onError = (error: unknown) => {
    if (error instanceof AxiosError) {
      showSaveErrorAlert(error.response?.data || unknownApiError);
    }
  };

  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({ onError }),
      mutationCache: new MutationCache({ onError }),
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
