import React from "react";
import { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaProvider>
      {children}
    </SafeAreaProvider>
  );
};

export default memo(Providers);
