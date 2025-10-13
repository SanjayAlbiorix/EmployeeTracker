import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { getGreeting } from "./module";

const NativeModuleUsage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const onPress = async () => {
    setLoading(true);
    try {
      const v = await getGreeting();
      setValue(v);
    } catch (e: any) {
      setValue(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Button
        title={loading ? "Loading..." : "Get Native Greeting"}
        onPress={onPress}
      />
      <Text testID="greeting-value">{value}</Text>
    </View>
  );
};

export default NativeModuleUsage;
