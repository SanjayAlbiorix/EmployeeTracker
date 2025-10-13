import { SQLiteProvider } from "expo-sqlite";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { migrateDbIfNeeded } from "./migrations";
import SqliteUsage from "./SqliteUsage";

const SqliteExample = () => {
  return (
    <SQLiteProvider databaseName="app.db" onInit={migrateDbIfNeeded}>
      <View style={styles.container}>
        <SqliteUsage />
      </View>
    </SQLiteProvider>
  );
};

export default memo(SqliteExample);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
