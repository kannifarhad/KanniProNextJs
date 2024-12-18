import Blog from "@/components/screens/Blog";
import { getArticleList } from "@/services/ArticlesService";
import createApolloClient from "@/services/apolloClient";

const BlogPage = async () => {
  const client = await createApolloClient();
  const { data } = await getArticleList(client, { page: 1, pageSize: 20 });
  return <Blog blogList={data.articles} />;
};

export default BlogPage;
