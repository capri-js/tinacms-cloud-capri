import {
  ContentQueryDocument,
  ContentQueryQuery,
  PageConnectionDocument,
} from "../.tina/__generated__/types";
import { Blocks } from "./components/blocks-renderer";
import { Layout } from "./components/layout";
import { useTina } from "./tina/useTina";

PageConnectionDocument;
export function HomePage() {
  const { data } = useTina<ContentQueryQuery>({
    query: ContentQueryDocument,
    variables: {
      relativePath: `home.md`,
    },
  });
  return (
    <Layout rawData={data} data={data.global as any}>
      <Blocks {...data.page} />
    </Layout>
  );
}
