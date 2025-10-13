import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import MainApp from "./app/root/MainApp";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <MainApp />
          </RecoilRoot>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
