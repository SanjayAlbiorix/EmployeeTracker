import React, { memo } from "react";
import { Routes, ScreenProps } from "../root/index.types";
import NativeModuleUsage from "../native_modules/NativeModuleUsage";

const Home: React.FC<ScreenProps<Routes.Home>> = () => {
  return <NativeModuleUsage />;
};

export default memo(Home);
