"use client";
import styled from "styled-components";

export const StyledBlogItem = styled.div`
  width: 100%;
  height: 500px;
  border-radius: var(--border-radius);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  position: relative;
  & .shortStory {
    position: absolute;
    width: calc(100% - 40px);
    padding: 20px;
    border-radius: 20px;
    bottom: 20px;
    left: 20px;
    background: var(--card-background);
    & .categoryList {
      display: flex;
      align-items: center;
      gap: 8px; /* Optional spacing between spans */
      span {
        position: relative;
        padding-right: 10px; /* Add space for the circle */
        font-size: 14px;
        margin-right: 10px;
        border-radius: 10px;
        &:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -5px;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background-color: black;
          border-radius: 50%;
        }
      }
    }
    & .readmore {
      padding-top: 5px;
      display: block;
      font-size: 20px;
      line-height: 25px;
      font-weight: 500;
    }
  }
`;
