import BlogInner from "@/components/screens/BlogInner";
import { serializeContent } from "@/components/ui/HTMLSerializer/serializeContent";
import { getArticleItemBySlug } from "@/services/ArticlesService";
import createApolloClient from "@/services/apolloClient";
import { getImagePath } from "@/helpers/common";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params to extract slug
  const client = await createApolloClient();
  const {
    data: { articleBySlug },
  } = await getArticleItemBySlug(client, slug);

  return {
    title: articleBySlug.title,
    description: articleBySlug.description,
    openGraph: {
      title: `${articleBySlug.title} | Farhad Aliyev`,
      description: articleBySlug.description,
      url: `/blog/${slug}`,
      images: [
        {
          url: getImagePath(articleBySlug.cover.url),
          alt: articleBySlug.title,
        },
      ],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await params to extract slug
  const client = await createApolloClient();
  const { data: { articleBySlug } } = await getArticleItemBySlug(client, slug);
  const content = await serializeContent(articleBySlug.fullstory);
  return <BlogInner content={content} {...articleBySlug} />;
}
