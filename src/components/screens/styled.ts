"use client";
import styled from "styled-components";

export const StyledNotFoundContainer = styled.div`
  & .catsronaut {
    height: 700px;
  }
  & .innerHead {
    padding: 0px;
    position: relative;
    overflow: hidden;
    & .head {
      padding: 30px;
      position: absolute;
      background: var(--head-background);
      z-index: 1;
      border-radius: 0px 0px var(--border-radius);
    }
  }
`;
