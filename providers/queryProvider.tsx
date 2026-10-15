"use client"
import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const makeQueryClient = () => {
  return new QueryClient();
};

let browserQueryCLient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else if (!browserQueryCLient) {
    browserQueryCLient = makeQueryClient();
  }
  return browserQueryCLient;
};

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const QueryClient = getQueryClient();
  return (
    <OriginalQueryClientProvider client={QueryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
};
