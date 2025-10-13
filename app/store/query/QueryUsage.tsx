import React from "react";
import { Text, FlatList, ActivityIndicator } from "react-native";
import { useGetUsersQuery } from ".";

export default function QueryUsage() {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error fetching users</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={{ padding: 10 }}>
          {item.name} - {item.email}
        </Text>
      )}
    />
  );
}
