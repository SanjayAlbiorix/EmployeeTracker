// src/Main.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

type Item = { id: number; value: string; created_at: string; extra?: string };

export default function SqliteUsage() {
  const db = useSQLiteContext(); // provided by SQLiteProvider
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (!db) return;
    loadItems();
  }, [db]);

  async function loadItems() {
    if (!db) return;
    const rows = await db.getAllAsync<Item>(
      "SELECT * FROM items ORDER BY id DESC;"
    );
    setItems(rows);
  }

  async function addOrUpdate() {
    if (!db) return;
    if (!text.trim()) return Alert.alert("Please enter text");
    if (editingId) {
      await db.runAsync(
        "UPDATE items SET value = ? WHERE id = ?;",
        text,
        editingId
      );
      setEditingId(null);
    } else {
      await db.runAsync("INSERT INTO items (value) VALUES (?);", text);
    }
    setText("");
    await loadItems();
  }

  async function onEdit(item: Item) {
    setEditingId(item.id);
    setText(item.value);
  }

  async function onDelete(id: number) {
    if (!db) return;
    await db.runAsync("DELETE FROM items WHERE id = ?;", id);
    await loadItems();
  }

  if (!db) return <Text style={{ padding: 20 }}>Initializing DB...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo SQLite — Modern Example</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter item"
        style={styles.input}
      />
      <Button title={editingId ? "Update" : "Add"} onPress={addOrUpdate} />

      <FlatList
        style={{ marginTop: 16 }}
        data={items}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.meta}>{item.created_at}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => onEdit(item)} />
              <Button
                title="Del"
                color="#cc0000"
                onPress={() => onDelete(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  actions: { flexDirection: "row", gap: 8 },
  value: { fontSize: 16 },
  meta: { color: "#666", fontSize: 12 },
});
