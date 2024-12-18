import { StyledBlogListContainer } from "./styled";
import LastFromBlogCarousel from "@/components/sections/LastFromBlogCarousel";
import HTMLSerializer, { ContentParsed } from "@/components/ui/HTMLSerializer";
import React from "react";
import BlogInnerHead from "./BlogInnerHead";
import { Article } from "@/types/api";

type BlogPageProps = Article & { content?: ContentParsed };
const BlogPage: React.FC<BlogPageProps> = ({ content, title, description }) => {
  return (
    <StyledBlogListContainer>
      <BlogInnerHead title={title} subtitle={description} />
      <div style={{ paddingBottom: "100px" }}>
        <HTMLSerializer content={content} />
      </div>
      <LastFromBlogCarousel />
    </StyledBlogListContainer>
  );
};

export default BlogPage;
