"use client";
import styled from "styled-components";

export const StyledBlogListContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: var(--background);
  border-radius: 0px 0px var(--border-radius) var(--border-radius);
  /* &::after {
    content: " ";
    pointer-events: none;
    right: 0px;
    height: 600px;
    position: absolute;
    width: 100px;
    top: 0px;
    z-index: 1;
    border-radius: 0px var(--border-radius) var(--border-radius) 0px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--card-background) 98%
    );
  } */
`;
