import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainApp from "./app/root/MainApp";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <MainApp />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
