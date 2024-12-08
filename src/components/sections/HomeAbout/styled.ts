"use client";
import styled from "styled-components";

export const StyledSochialList = styled.div`
  filter: url("#goo");
  a {
    width: 46px;
    height: 46px;
    margin-left: -3px;
    background: var(--background);
    transition: transform 0.2s ease-out;
    overflow: hidden;
    &:hover {
      transform: scale(1.2);
      transition: transform 0.2s ease-out;
    }
    img {
      margin: 0px;
    }
  }
`;

export const StyledHomeAbout = styled.div`
  grid-auto-rows: 1fr;
  margin-top: -140px;

  & .skills,
  & .block-item {
    height: 100%;
  }
  & .primary-skills {
    background: var(--card-bg3);
    & .block-heading,
    & .tagItem {
      color: var(--text-ondark-color);
    }
  }
  & .primary-skills,
  & .secondary-skills {
    padding-top: 150px;
    & .blockContent {
      padding-top: 70px;
    }
  }
  & .about-me {
    background: none;
  }

  @media screen and (max-width: 900px) {
    margin-top: -60px;
    grid-auto-rows: auto;
    padding-top: 0px;

    overflow: hidden;
    & .primary-skills,
    & .secondary-skills {
      padding-top: 80px;

      & .blockContent {
        padding-top: 40px;
      }
    }
  }
  @media screen and (max-width: 645px) {
    & .secondary-skills {
      padding: 30px;
      margin-top: -60px;
      padding-top: 80px !important;
      z-index: 0;
    }
    & .primary-skills {
      z-index: 1;
    }
  }
`;

export const StyledHomeSkills = styled.div``;
