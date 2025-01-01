"use client";
import styled from "styled-components";

export const StyledCodeBlock = styled.div`
  /* background: #ccc; */
  border-radius: 20px;
  overflow: hidden;
  margin: 30px 0px;
  & .codehead {
    padding: 12px 14px 10px 20px;
    background: var(--head-background);
    display: flex;
    flex-direction: row;
    align-items: center;
    /* border: 1px solid #aeb0c7; */
    border-radius: 20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom: 0px;
    & .codetitle {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        font-weight: 500;
        font-style: oblique;
        color: #616d83;
      }
      & .macbuttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-right: 5px;
          background-color: rgb(8, 156, 0);
        }
      }
      & .extension {
        color: #6d73c6;
        border: 1px solid #6d73c6;
        padding: 3px 5px;
        font-size: 10px;
        border-radius: 10px;
        margin-left: 10px;
      }
    }
    & .codetoolbox {
      margin-left: auto;
      & .copyCode {
        border-radius: 5px;
        padding: 5px 10px;
        & .title {
          color: #6d73c6;
          font-size: 14px;
        }
        cursor: var(--custom-pointer) !important;
        & .copyCodeIcon {
          transition: all 0.3s;
        }
        &:hover {
          background:rgba(255, 255, 255, 0.8);
          border-color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s;
          & .copyCodeIcon {
            fill: #6d73c6 !important;
          }
        }
      }
    }
  }

  & .codeblock {
    & > div {
      padding: 10px 15px 20px 15px !important;
    }
    & .defaultcode {
      background: #282c34;
      display: block;
      padding: 10px 15px;
      color: #abb2bf;
    }
    pre {
      border-radius: 0px;
    }
  }
`;
