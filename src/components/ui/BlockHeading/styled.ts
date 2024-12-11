"use client";
import styled from "styled-components";

export const StyledBlockHead = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 5px;

  & .icon {
    & img {
      width: 40px;
      height: auto;
    }
  }
  & .title {
    text-align: left;
    & h3 {
      font-weight: 800;
      font-size: 26px;
      line-height: 26px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-family: var(--font-bebas);
    }
    & p {
      font-size: 14px;
    }
  }
`;
