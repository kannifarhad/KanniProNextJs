import { memo } from "react";
import React from "react";
import { StyledBlogMainBlock, StyledLastFromBlogContainer } from "./styled";
import BlogListCarousel from "./BlogListCarousel";
import createApolloClient from "@/services/apolloClient";
import { getArticleList } from "@/services/ArticlesService";

const BlogList = async () => {
  let data = null;
  let error = null;

  try {
    const client = await createApolloClient();
    const result = await getArticleList(client, { page: 1, pageSize: 20 });
    data = result.data;
    error = result.error;
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div>
        <h2>Failed to load blog data. Please try again later.</h2>
      </div>
    );
  }

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
        <BlogListCarousel blogList={data?.articles || []} />
      </div>
    </StyledLastFromBlogContainer>
  );
};

export default memo(BlogList);