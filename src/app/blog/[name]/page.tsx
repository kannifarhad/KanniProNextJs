import BlogInner from "@/components/screens/BlogInner";
import { serializeContent } from "@/components/ui/HTMLSerializer/serializeContent";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    "https://raw.githubusercontent.com/hashicorp/next-mdx-remote/refs/heads/main/README.md",
    { cache: "no-store" }
  );
  console.log("id", id);
  const markdown = await res.text();
  const content = await serializeContent(markdown);
  return <BlogInner content={content} />;
}
