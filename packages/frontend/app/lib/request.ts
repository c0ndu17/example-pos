import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { getGraphQLUri } from "~/lib/env";

export const queryClient = new QueryClient();
export const client = new GraphQLClient(getGraphQLUri(), {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
