import React from "react";
import { memo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Providers from "@/app/Providers";
import Navigation from "@/app/Navigation";

type Props = {};

const App: React.FC<Props> = () => {

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

console.log("supabaseUrl", supabaseUrl);
console.log("supabaseAnonKey", supabaseAnonKey);    

  return (
    <Providers>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Providers>
  );
};

export default memo(App);