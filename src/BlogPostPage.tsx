import { Post } from "./components/posts/post";
import { Layout } from "./components/layout";
import {
  BlogPostQueryDocument,
  BlogPostQueryQuery,
} from "../.tina/__generated__/types";
import { useParams } from "react-router-dom";
import { useTina } from "./tina/useTina";

export default function BlogPostPage() {
  const params = useParams();
  const { data } = useTina<BlogPostQueryQuery>({
    query: BlogPostQueryDocument,
    variables: {
      relativePath: `${params.slug}.mdx`,
    },
  });
  if (data && data.post) {
    return (
      <Layout rawData={data} data={data.global as any}>
        <Post {...data.post} />;
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}
