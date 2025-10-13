import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Ref } from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { RootStackParamList, Routes } from "./index.types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef: Ref<NavigationContainerRef<RootStackParamList>> =
  React.createRef();

const NavigationStack = () => {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={Routes.Home}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={Routes.Home} component={Home} />
          <Stack.Screen
            name={Routes.Login}
            component={Login}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationStack;
