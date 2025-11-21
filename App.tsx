import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { ErrorBoundary } from "react-error-boundary";
import { initStorage } from "./src/utils/storage";
import AppNavigator from "./src/navigation/AppNavigator";
import ErrorFallback from "./src/components/ErrorBoundary";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
