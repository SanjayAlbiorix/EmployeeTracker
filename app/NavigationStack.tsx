import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Routes, { NavigationParams } from "./utils/Routes";

const Stack = createNativeStackNavigator<NavigationParams>();

const NavigationStack = () => {
  return (
    <>
      <NavigationContainer>
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
