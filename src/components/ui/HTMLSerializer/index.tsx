import { MDXRemote, MDXRemoteProps, } from "next-mdx-remote/rsc";
import React, { memo } from "react";
import { CompileOptions } from '@mdx-js/mdx';
import { Code } from "@/components/ui/HTMLSerializer/MDXcomponents";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

type ArrayElement<T> = T extends (infer U)[] ? U : never;
type Pluggable = ArrayElement<NonNullable<CompileOptions['remarkPlugins']>>

const Content: React.FC<{ content?: string }> = ({ content }) => {
  if (!content) return null;
  return (
    <ErrorBoundary fallback={<></>}>
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMdxCodeMeta as Pluggable],
            rehypePlugins: [],
          },
        }}
        components={{ pre: Code } as MDXRemoteProps["components"]}
      />
    </ErrorBoundary>
  );
};

export default memo(Content);
