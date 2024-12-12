import { StyledBlogListContainer } from "./styled";
import LastFromBlogCarousel from "@/components/sections/LastFromBlogCarousel";
import HTMLSerializer, { ContentParsed } from "@/components/ui/HTMLSerializer";
import React from "react";
import BlogInnerHead from "./BlogInnerHead";

const BlogPage: React.FC<{ content?: ContentParsed }> = ({ content }) => {
  return (
    <StyledBlogListContainer>
      <BlogInnerHead
        title="Mastering Redux Toolkit for State Management"
        subtitle="Because spending countless hours debugging and perfecting something no one asked for is definitely my idea of fun. 🤷🏻‍♂️"
      />
      <div style={{ paddingBottom: "100px" }}>
        <HTMLSerializer content={content} />
      </div>
      <LastFromBlogCarousel />
    </StyledBlogListContainer>
  );
};

export default BlogPage;
