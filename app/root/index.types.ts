import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum Routes {
  Home = "Home",
  Login = "Login",
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Login]: { item: any };
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
