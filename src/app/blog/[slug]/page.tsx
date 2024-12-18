import BlogInner from "@/components/screens/BlogInner";
import { serializeContent } from "@/components/ui/HTMLSerializer/serializeContent";
import { getArticleItemBySlug } from "@/services/ArticlesService";
import createApolloClient from "@/services/apolloClient";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = await createApolloClient();
  const { data: { articleBySlug } } = await getArticleItemBySlug(client, slug);
  const content = await serializeContent(articleBySlug.fullstory);
  return <BlogInner content={content} {...articleBySlug} />;
}
