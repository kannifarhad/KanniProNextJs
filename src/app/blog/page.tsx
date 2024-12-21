import Blog from "@/components/screens/Blog";
import { getArticleList } from "@/services/ArticlesService";
import createApolloClient from "@/services/apolloClient";

export const metadata = {
  title: "Blog: Random things I built, develop and care about |Farhad Aliyev",
  description:
    "Because spending countless hours debugging and perfecting something no one asked for is definitely my idea of fun. 🤷🏻‍♂️",
};

const BlogPage = async () => {
  const client = await createApolloClient();
  const { data } = await getArticleList(client, { page: 1, pageSize: 20 });
  return (
    <>
      <Blog blogList={data.articles} />;
    </>
  );
};

export default BlogPage;
