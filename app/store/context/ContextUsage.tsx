import React from "react";
import { View, Text, Button } from "react-native";
import { useAppContext } from ".";

export default function ContextUsage() {
  const { state, dispatch } = useAppContext();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Count: {state.count}</Text>

      <Button title="Increase" onPress={() => dispatch({ type: "INCREASE" })} />
      <Button title="Decrease" onPress={() => dispatch({ type: "DECREASE" })} />
      <Button title="Reset" onPress={() => dispatch({ type: "RESET" })} />
    </View>
  );
}
