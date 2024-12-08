import BlogInner from "@/components/screens/BlogInner";
import { serializeContent } from "@/components/ui/HTMLSerializer/serializeContent";

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await fetch(
    "https://raw.githubusercontent.com/hashicorp/next-mdx-remote/refs/heads/main/README.md",
    { cache: "no-store" }
  );
  const markdown = await res.text();
  const content = await serializeContent(markdown);
  return <BlogInner content={content} />;
};

export default BlogPage;
