import React from "react";
import { memo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Providers from "@/app/Providers";
import Navigation from "@/app/Navigation";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <Providers>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Providers>
  );
};

export default memo(App);