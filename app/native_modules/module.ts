import { NativeModules, Platform } from "react-native";

const LINKING_ERROR =
  `The native module 'SimpleGreeting' is not linked properly.\n` +
  (Platform.OS === "ios"
    ? "iOS build not implemented for this sample."
    : "Make sure you ran expo prebuild and rebuilt the Android app.");

type SimpleGreetingType = {
  getGreeting: () => Promise<string>;
};

const Native: SimpleGreetingType | undefined = (NativeModules as any)
  .SimpleGreeting;

export async function getGreeting(): Promise<string> {
  if (!Native) throw new Error(LINKING_ERROR);
  return Native.getGreeting();
}
