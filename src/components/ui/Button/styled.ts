"use client";
import styled from "styled-components";

export const StyledButton = styled.button`
  --green-color: #cdff65;

  --button-padding: 10px 16px;
  --button-radius: 15px;
  --icon-size: 20px;

  --button-text-color: var(--background);
  --button-text-hover-color: var(--background);

  --button-bg-color: var(--foreground);
  --button-bg-hover-color: transparent;

  --button-span-color: var(--foreground);

  --button-border-color: var(--foreground);
  --button-border-hover-color: var(--foreground);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--button-padding);
  border: 1px solid var(--button-border-color);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  transition: all 0.3s ease;
  color: var(--button-text-color);
  background: var(--button-bg-color);

  &:hover {
    color: var(--button-text-hover-color);
    border-color: var(--button-border-hover-color);
    & .title {
      color: var(--button-text-hover-color);
      transition: all 0.3s ease;
    }
    & .svgicon {
      fill: var(--button-text-hover-color);
      transition: all 0.3s ease;
    }
    span {
      width: 500px;
      height: 500px;
    }
  }

  &.hasTitle {
    &.svgicon {
      margin-right: 8px;
    }
  }
  /* &:active {
    background-color: $btn-color;
  } */

  span {
    position: absolute;
    display: block;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    transform: translate(-50%, -50%);
    z-index: -1;
    background: var(--button-span-color);
  }

  & .title {
    font-size: 15px;
    font-weight: 500;
    color: var(--button-text-color);
    transition: all 0.3s ease;
  }

  & .svgicon {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--button-text-color);
    transition: all 0.3s ease;
  }

  &.outlined {
    background-color: transparent;
    color: var(--button-bg-color);
    border: 1px solid var(--button-bg-color);
  }

  &.text {
    background-color: transparent;
    border-color: transparent;
  }

  &.green {
    --button-text-color: var(--foreground);
    --button-text-hover-color: var(--green-color);

    --button-bg-color: var(--green-color);
    --button-bg-hover-color: var(--green-color);

    --button-span-color: var(--foreground);
    --button-border-color: var(--green-color);
    --button-border-hover-color: var(--foreground);
  }

  &.green.text {
    --button-text-color: var(--green-color);
    --button-text-hover-color: var(--dark-grey);
    --button-span-color: var(--green-color);
  }

  &.primary.outlined {
    --button-span-color: var(--green-color);
    --button-text-color: var(--dark-grey);

    --button-text-hover-color: var(--dark-grey);
    --button-border-hover-color: var(--green-color);
  }
`;
