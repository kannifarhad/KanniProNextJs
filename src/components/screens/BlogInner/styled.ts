"use client";
import styled from "styled-components";

export const StyledBlogListContainer = styled.div`
  position: relative;
  background: var(--background);
  border-radius: 0px 0px var(--border-radius) var(--border-radius);
`;

export const StyledBlogContent = styled.article`
  padding: 0px 20px 100px 20px;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  margin: 0px auto;
  font-size: 17px;
  & h1 {
    font-size: 30px;
  }
  & h3,
  & h2 {
    font-size: 23px;
  }
  & hr {
  }
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin: 2em 0 0.5em;
    font-weight: bold;
    line-height: 1.2;
  }

  & p {
    margin: 0.5em 0;
  }

  & a {
    color: #575fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  & ul,
  & ol {
    margin: 1em 0;
    padding-left: 2em;
    list-style: disc;
  }

  & li {
    margin-bottom: 0.5em;
  }

  & blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #ccc;
    font-style: italic;
    background-color: #f9f9f9;
  }

  & code {
    font-family: "Courier New", Courier, monospace;
    background-color: #f4f4f4;
    border-radius: 3px;
  }

  & pre {
    background-color: #f4f4f4;
    padding: 1em;
    overflow-x: auto;
    border-radius: 5px;
    font-family: "Courier New", Courier, monospace;
  }

  & img {
    max-width: 100%;
    width: 100%;
    height: auto;
    display: block;
    margin: 1em 0;
  }
  & .roundedImage {
    border: 1px solid var(--head-background);
  }
  & .headingLinks {
    color: rgb(134, 134, 134);
    margin-right: 5px;
  }
  & .space {
    width: 100%;
    height: 40px;
  }
  & table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;

    & th,
    & td {
      border: 1px solid #ddd;
      padding: 0.5em;
      text-align: left;
    }

    & th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 645px) {
    & .headingLinks {
      display: none;
    }
    /* & .roundedImage {
      margin: 30px -20px;
    } */
  }
`;

export const StyledRelatedArticles = styled.div`
  padding: 30px 20px 50px 20px;
  & h2 {
    font-size: 35px;
    font-weight: bold;
    font-family: var(--font-bebas);
  }
  & .relatedArticle {
    display: flex;
    flex-direction: column;
    /* width: fit-content; */
    background: var(--card-background);
    border-radius: 10px;
    padding: 15px 20px;
    transition: all 0.3s;
    &:hover {
      background: var(--head-background);
      transition: all 0.3s;
      color: var(--dark-grey);
    }
    & .title {
      font-weight: 800;
      font-size: 18px;
    }
    & .description {
      margin-top: 5px;
      line-height: 18px;
      font-size: 15px;
    }
  }
`;
