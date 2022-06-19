import useSWR from "swr";
import { staticRequest } from "tinacms";
import { useTina as useEditTina } from "tinacms/dist/edit-state";

type Args = {
  query: string;
  variables?: object;
};

// A fetcher function for SWR that performs a staticRequest.
// This is only used on the server during build.
async function fetcher<T>({ query, variables = {} }: Args) {
  let data: T | undefined;
  try {
    data = (await staticRequest({
      query,
      variables,
    })) as T;
  } catch (err) {
    console.log(err);
    // ignore errors related to document creation
  }
  return data;
}

/**
 * A universal useTina hook. During a static build, it uses SWR in suspense
 * mode to fetch the data via `staticRequest`. When running as SPA, it uses
 * the regular useTina hook.
 */
export function useTina<T extends object>({ query, variables = {} }: Args) {
  if (process.env.SSR) {
    // In case you wonder why we conditionally call a hook here:
    // This is fine, since import.meta.env.SSR is evaluated during build-time
    // and will never change.
    const { data, isValidating } = useSWR<T | undefined>(
      { query, variables },
      fetcher,
      {
        suspense: true,
      }
    );
    return {
      data,
      isLoading: isValidating,
    };
  } else {
    return useEditTina<T>({ query, variables, data: {} as any });
  }
}
