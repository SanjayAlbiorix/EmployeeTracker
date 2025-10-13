import React from "react";
import { View, Text, Button } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { counterState, doubledCounter } from ".";

export default function RecoilUsage() {
  const [count, setCount] = useRecoilState(counterState);
  const doubled = useRecoilValue(doubledCounter);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Count: {count}</Text>
      <Text style={{ fontSize: 20 }}>Doubled: {doubled}</Text>
      <Button title="Increase" onPress={() => setCount(count + 1)} />
      <Button title="Decrease" onPress={() => setCount(count - 1)} />
    </View>
  );
}
