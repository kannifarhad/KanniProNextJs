"use client";
import styled from "styled-components";

export const StyledCodeBlock = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin: 30px 0px;
  & .codehead {
    padding: 8px 10px 7px 20px;
    background: var(--head-background);
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 0px;
    & .codetitle {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        color: #616d83;
        font-weight: 400;
        span {
          color: #6d73c6;
          font-weight: 500;
        }
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
          background: rgba(255, 255, 255, 0.8);
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
      line-height: 15px;
    }
    pre {
      border-radius: 0px;
      font-size: 15px;
      line-height: 19px;
    }
    code {
      background: none;
      font-size: 15px;
      line-height: 19px;
    }
  }

  @media screen and (max-width: 645px) {
    margin: 30px -20px;
  }
`;

export const StyledInfoBox = styled.div`
  margin: 30px 0px;
  padding: 10px 10px 10px 30px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 4px solid rgb(210 212 254);
  background-color: rgb(210 212 254 / 40%);
  &.warning {
    border-left: 4px solid rgb(255 167 0);
    background-color: rgba(255, 167, 0, 0.2);
  }
  &.success {
    border-left: 4px solid rgb(71 204 104);
    background-color: rgb(71 204 104 / 20%);
  }
  &.error {
    border-left: 4px solid rgb(242 50 50);
    background-color: rgb(242 49 50 / 20%);
  }
`;

export const StyledAccordion = styled.div`
  --accordion-border-color: rgb(210 212 254);
  --accordion-background-color: rgb(210 212 254 / 40%);
  margin: 30px 0px;

  &.warning {
    --accordion-border-color: rgb(255 167 0);
    --accordion-background-color: rgba(255, 167, 0, 0.2);
  }
  &.success {
    --accordion-border-color: rgb(71 204 104);
    --accordion-background-color: rgb(71 204 104 / 20%);
  }
  &.error {
    --accordion-border-color: rgb(242 50 50);
    --accordion-background-color: rgb(242 49 50 / 20%);
  }
  & > .title {
    padding: 20px;
    border-radius: 10px;
    border: 1px solid var(--accordion-border-color);
    background-color: var(--accordion-background-color);
    font-weight: 800;
    font-size: 20px;
    user-select: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    & .arrow {
      transform: rotate(-90deg);
      background: var(--accordion-border-color);
      border-radius: 50%;
      padding: 8px;
      & svg, path {
        fill: var(--background);
      }
    }
  }
  & > .content {
    border: 1px solid var(--accordion-border-color);
    background-color: var(--accordion-background-color);
    border-top: none;
    overflow: hidden;
    margin: 0px;
    padding: 10px 15px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: none;
  }
  &.isOpen {
    & > .title {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      & .arrow {
        transform: rotate(0deg);
      }
    }
    & > .content {
      display: block;
    }
  }
`;
