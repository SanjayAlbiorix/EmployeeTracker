import React from "react";
import { ScrollView, View } from "react-native";

type Props = {
  scroll?: boolean;
  children: React.ReactNode;
};

export default function ScreenContainer({ scroll, children }: Props) {
  if (scroll) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={{ flex: 1 }}>{children}</View>;
}
