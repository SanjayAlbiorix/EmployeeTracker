import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { theme } from "../theme";

type Props = {
  scroll?: boolean;
  children: React.ReactNode;
};

const ScreenContainer: React.FC<Props> = ({ scroll = false, children }) => {
  if (scroll) {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xl,
  },
});

export default ScreenContainer;
