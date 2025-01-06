import BlogInner from "@/components/screens/BlogInner";
import { getArticleItemBySlug } from "@/services/ArticlesService";
import createApolloClient from "@/services/apolloClient";
import { getImagePath } from "@/helpers/common";
import generateMetadataHelper from "@/helpers/generateMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await params to extract slug
  const client = await createApolloClient();
  const {
    data: { articleBySlug },
  } = await getArticleItemBySlug(client, slug);
  return generateMetadataHelper({
    title: articleBySlug.title,
    description: articleBySlug.description,
    image: getImagePath(articleBySlug.cover.url),
    // url: `/blog/${slug}`,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await params to extract slug
  const client = await createApolloClient();
  const {
    data: { articleBySlug },
  } = await getArticleItemBySlug(client, slug);
  return <BlogInner article={articleBySlug} />;
}
