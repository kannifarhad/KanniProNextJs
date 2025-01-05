import { StyledBlogListContainer, StyledBlogContent } from "./styled";
import LastFromBlogCarousel from "@/components/sections/LastFromBlogCarousel";
import HTMLSerializer from "@/components/ui/HTMLSerializer";
import React from "react";
import BlogInnerHead from "./BlogInnerHead";
import { Article } from "@/types/api";
import "@/assets/atom-one-dark.css.css";
import RelatedArticles from "./RelatedArticles";

const BlogPage: React.FC<{ article: Article }> = ({ article }) => {
  const { fullstory, relatedarticles, ...rest } = article;
  return (
    <StyledBlogListContainer>
      <BlogInnerHead {...rest} />
      <StyledBlogContent>
        <HTMLSerializer content={fullstory} />
      </StyledBlogContent>
      {relatedarticles?.length !== 0 && (
        <RelatedArticles articles={relatedarticles} />
      )}
      <LastFromBlogCarousel />
    </StyledBlogListContainer>
  );
};

export default BlogPage;
