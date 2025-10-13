import React from "react";
import { useAtom } from "jotai/react";
import { Button, Text, View } from "react-native";
import { counterAtom } from ".";

export default function JotaiUsage() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Count: {count}</Text>

      <Button title="Increase" onPress={() => setCount(count + 1)} />
      <Button title="Decrease" onPress={() => setCount(count - 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />
    </View>
  );
}
