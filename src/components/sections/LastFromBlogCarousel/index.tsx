import { memo } from "react";
import React from "react";
import { StyledBlogMainBlock, StyledLastFromBlogContainer } from "./styled";
import BlogListCarousel from "./BlogListCarousel";
import createApolloClient from "@/services/apolloClient";
import { getArticleList } from "@/services/ArticlesService";

const BlogList = async () => {
  const client = await createApolloClient();
  const { data } = await getArticleList(client, { page: 1, pageSize: 20 });
  return (
    <StyledLastFromBlogContainer className="flex">
      <StyledBlogMainBlock>
        <div className="heading">
          <h2>
            Random things I built,
            <br /> develop <br />
            and care about
          </h2>
          <p>
            <i>
              Because spending countless hours debugging and perfecting
              something no one asked for is definitely my idea of fun.{" "}
            </i>
            <span>🤷🏻‍♂️</span>
          </p>
        </div>
      </StyledBlogMainBlock>
      <div className="flex-1">
        <BlogListCarousel blogList={data.articles} />
      </div>
    </StyledLastFromBlogContainer>
  );
};

export default memo(BlogList);