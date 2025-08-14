import Blog from "@/components/screens/Blog";
import { getArticleList } from "@/services/ArticlesService";
import createApolloClient from "@/services/apolloClient";
import generateMetadata from "@/helpers/generateMetadata";
export const metadata = generateMetadata({
  title: "Blog: Random things I built, develop and care about",
  description:
    "Because spending countless hours debugging and perfecting something no one asked for is definitely my idea of fun. 🤷🏻‍♂️",
});

export const revalidate = 60; // re-fetch every 60s

const BlogCatgory = async () => {
  const client = await createApolloClient();
  const { data } = await getArticleList(client, { page: 1, pageSize: 50 });
  return (
    <>
      <Blog blogList={data.articles} />;
    </>
  );
};

export default BlogCatgory;
