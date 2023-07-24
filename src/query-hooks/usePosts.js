import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async ({ signal }) => {
      const {
        posts: { data },
      } = await request(
        "https://graphqlzero.almansi.me/api",
        gql`
          query {
            posts(
              options: {
                paginate: { limit: 15 }
                sort: { field: "id", order: DESC }
              }
            ) {
              data {
                id
                title
                body
              }
            }
          }
        `,
        signal
      );
      return data;
    },
  });

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const { title, body } = input;
      const { data } = await request(
        "https://graphqlzero.almansi.me/api",
        gql`
          mutation createPost($title: String!, $body: String!) {
            createPost(input: { title: $title, body: $body }) {
              title
              body
            }
          }
        `,
        { title, body }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export { usePosts, useCreatePost };
