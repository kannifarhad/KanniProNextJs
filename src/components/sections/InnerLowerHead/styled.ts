"use client";
import styled from "styled-components";

export const StyledLowerHead = styled.div`
  padding: 30px 30px 20px 30px;
  background: var(--head-background);
  border-radius: 0px var(--border-radius) var(--border-radius)
    var(--border-radius);
  margin-bottom: 50px;
  & .head {
    padding: 30px 0px;
    width: 100%;
    max-width: 600px;
    color: var(--text-onlight-color);
    & .coverImage {
      overflow: hidden;
      border-radius: var(--border-radius);
      & img {
        height: auto;
        width: 300px;
      }
    }
    & h2 {
      font-family: var(--font-bebas);
      font-size: 50px;
      line-height: 45px;
    }
    & h6 {
      font-size: 18px;
    }
  }
`;
