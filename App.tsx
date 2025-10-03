import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainApp from "./app/MainApp";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}
