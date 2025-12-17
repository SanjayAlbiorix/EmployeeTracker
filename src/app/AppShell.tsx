import React from "react";
import { memo } from "react";
import { AppLayout } from "../ui/layout/AppLayout";
import { StatusBar } from "expo-status-bar";

type Props = {
  children: React.ReactNode;
};

const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <AppLayout>
      {children}
      <StatusBar style="auto" />
    </AppLayout>
  );
};

export default memo(AppShell);
