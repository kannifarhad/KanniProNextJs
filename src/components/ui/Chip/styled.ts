"use client";
import styled from "styled-components";

export const StyledChipWithIcon = styled.div`
  opacity: 1;
  transition: all 1s;
  border: 1px solid #bcbcbca1;
  border-radius: 35px;
  padding: 2px;
  & > span {
    border-radius: 50px;
    display: flex;
    align-items: center;
    padding: 5px;
    color: #fff;
  }
  & .icon {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    justify-content: center;
    background: #bcbcbca1;
    overflow: hidden;
    svg {
      fill: var(--background);
    }
    &.fill {
      padding: 0px;
      position: relative;
      & img {
        height: 100%;
        position: absolute;
        left: 50%;
        top: 0px;
        transform: translateX(-50%);
        width: auto;
        max-width: none;
      }
    }
  }
  & .title {
    padding: 0px 9px 0px 7px;
    color: var(--foreground);
    font-size: 15px;
    a {
      position: relative;
      padding: 0px 10px; /* Add space for the circle */
      font-size: 14px;
      line-height: 16px;
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
      &:hover {
        color: var(--card-bg3);
      }
    }
  }
  &:hover {
    opacity: 1;
    transition: all 1s;
  }
`;
