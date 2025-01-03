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
    margin: 1em 0 0.5em;
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
  & .roundedImage{
    border: 1px solid var(--head-background);

  }
  & .headingLinks {
    color: rgb(134, 134, 134);
    margin-right: 5px;
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
`;
