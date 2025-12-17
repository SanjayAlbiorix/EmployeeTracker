import React from "react";
import { memo } from "react";
import ResponsiveLayout from "../ui/layout/ResponsiveLayout";
import { StatusBar } from "expo-status-bar";

type Props = {
  children: React.ReactNode;
};

const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <ResponsiveLayout>
      {children}
      <StatusBar style="auto" />
    </ResponsiveLayout>
  );
};

export default memo(AppShell);
