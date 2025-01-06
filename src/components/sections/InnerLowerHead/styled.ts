"use client";
import styled from "styled-components";

export const StyledLowerHead = styled.div`
  padding: 30px 30px 20px 30px;
  background: var(--head-background);
  border-radius: 0px var(--border-radius) var(--border-radius)
    var(--border-radius);
  margin-bottom: 50px;
  & .head {
    padding-bottom: 10px;

    width: 100%;
    color: var(--text-onlight-color);
    & .coverImage {
      overflow: hidden;
      border-radius: 15px;
      width: 400px;
      position: relative;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        position: absolute;
      }
    }

    & .headtitles {
      padding-top: 10px;
      max-width: 600px;

      & h1 {
        font-family: var(--font-bebas);
        font-size: 50px;
        line-height: 50px;
      }
      & h6 {
        font-size: 18px;
        margin-bottom: 30px;
      }
      & .content {
        & .ChipWithIcon {
          border: 1px solid #ffffff;
          & .title {
            color : var(--text-onlight-color) !important;
          }
          & .icon {
            background: #ffffff;
          }
        }
      }
    }
  }

  @media screen and (max-width: 645px) {
    border-top-right-radius: 0px;
    & .head {
      padding-top: 30px;
      & .coverImage {
       display: none;
      }
    }
  }
`;
