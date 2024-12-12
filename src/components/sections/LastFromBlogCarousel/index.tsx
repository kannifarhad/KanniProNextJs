"use client";
import { memo } from "react";
import React from "react";
import { StyledBlogMainBlock, StyledLastFromBlogContainer } from "./styled";
import BlogListCarousel from "./BlogListCarousel";

const BlogList = () => {
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
        <BlogListCarousel />
      </div>
    </StyledLastFromBlogContainer>
  );
};

export default memo(BlogList);
