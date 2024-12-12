import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
// import { notFound } from "next/navigation";

type SerializeProps = Parameters<typeof serialize>[0];
export type SerializeContentResponse = ReturnType<typeof serialize>;
export type ContentParsed = Awaited<SerializeContentResponse>;

export const serializeContent = async (
  content: SerializeProps
): SerializeContentResponse => {
  return serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeCodeTitles, rehypePrism],
    },
  }).catch((e) => {
    // notFound();
    return serialize(`<strong>Error while compiling</strong>: ${e?.message}`);
    // console.log(`<strong>Error while compiling</strong>: ${e?.message}`);
  });
};

export default serializeContent;
