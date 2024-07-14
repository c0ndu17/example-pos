import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { client, queryClient } from "~/lib/request";

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery({
    /** eslint-disable-next-line @typescript-eslint/no-explicit-any */
    queryKey: [(document.definitions[0] as any).name.value, variables],
    queryFn: async ({ queryKey }) =>
      client.request(document, queryKey[1] ? queryKey[1] : undefined),
  });
}

export function useGraphQLMutation<TResult, TVariables, TError>(
  document: TypedDocumentNode<TResult, TVariables>,
  opts?: UseMutationOptions<TResult, TError, TVariables>,
) {
  return useMutation<TResult, TError, TVariables>({
    /** eslint-disable-next-line @typescript-eslint/no-explicit-any */
    mutationKey: [(document.definitions[0] as any).name.value],
    mutationFn: async (variables: TVariables) =>
      client.request(document, variables ? variables : undefined),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [],
      });
    },
    ...opts,
  });
}
