import { useInfiniteQuery } from "@tanstack/react-query";
import { APIManager, RequestType } from "./ServiceManager";
import { handleApiError } from "../error";
interface PostsResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const useInfinitePosts = () => {
  return useInfiniteQuery<PostsResponse[], Error>({
    queryKey: ["posts"],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 10) return allPages.length + 1;
      return undefined;
    },
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const data = {
          url: `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`,
          body: undefined,
        };

        const response = await APIManager(data, RequestType.get, false, false);

        return response.data;
      } catch (error: any) {
        handleApiError(error);
        throw error;
      }
    },
  });
};
