import React from "react";
import { View, Text, Button } from "react-native";
import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Something went wrong
      </Text>
      <Text style={{ marginBottom: 12 }}>{error?.message}</Text>
      <Button title="Try again" onPress={resetErrorBoundary} />
    </View>
  );
}
