import {
  PageConnectionDocument,
  PageQueryDocument,
  PageQueryQuery,
} from "../.tina/__generated__/types";
import { Layout } from "./components/layout";
import { Posts } from "./components/posts";
import { Container } from "./components/util/container";
import { Section } from "./components/util/section";
import { useTina } from "./tina/useTina";

PageConnectionDocument;
export function PostsPage() {
  const { data } = useTina<PageQueryQuery>({
    query: PageQueryDocument,
  });
  if (!data?.postConnection) return null;
  const posts = data.postConnection.edges;
  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}
