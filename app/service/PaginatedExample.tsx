import React from "react";
import { FlatList, Text, ActivityIndicator, View } from "react-native";
import { useInfinitePosts } from "./usePaginatedCalls";

export default function PostsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page) || [];

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={{ fontSize: 22, margin: 16 }}>{item.title}</Text>
      )}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ padding: 10 }}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : null
      }
    />
  );
}
