import { getArticleItemByCategorySlug, getCategoryInfoBySlug } from "@/services/ArticlesService";
import createApolloClient from "@/services/apolloClient";
// import { getImagePath } from "@/helpers/common";
import generateMetadataHelper from "@/helpers/generateMetadata";
import CategoryPage from "@/components/screens/Category";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = await createApolloClient();

  // Fetch category info for metadata
  const {
    data: { categories },
  } = await getCategoryInfoBySlug(client, slug);

  const category = categories?.[0]; // Get the first matching category

  return generateMetadataHelper({
    title: category?.name ?? "Category",
    description: category?.description ?? "",
    // image: category?.cover ? getImagePath(category.cover.url) : undefined,
    // url: `/category/${slug}`,
  });
}

export default async function BlogCategory({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = await createApolloClient();
  const { data } = await getArticleItemByCategorySlug(client, slug, { page: 1, pageSize: 50 });
  const {
    data: { categories },
  } = await getCategoryInfoBySlug(client, slug);

  const category = categories?.[0]; // Get the first matching category
  return <CategoryPage title={category.name} description={category.description} blogList={data.articles} />;
}
