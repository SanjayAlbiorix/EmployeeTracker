import React from "react";
import { memo } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { theme } from "../theme";

type Props = {
  fullScreen?: boolean;
};

const Loader: React.FC<Props> = ({ fullScreen }) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return <ActivityIndicator size="small" color={theme.colors.primary} />;
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
});

export default memo(Loader);
