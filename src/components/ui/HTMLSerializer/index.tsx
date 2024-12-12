"use client";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import React, { memo } from "react";
type SerializeContentResponse = ReturnType<typeof serialize>;
export type ContentParsed = Awaited<SerializeContentResponse>;

const Content: React.FC<{ content?: ContentParsed }> = ({ content }) => {
  if (!content) return null;
  return (
    // <Suspense fallback={<>Loading...</>}>
    <MDXRemote {...content} />
    // </Suspense>
  );
};

export default memo(Content);
