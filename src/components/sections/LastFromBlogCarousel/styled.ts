"use client";
import styled from "styled-components";

export const StyledLastFromBlogContainer = styled.div`
  width: 100%;
  border-radius: var(--border-radius);
  background: var(--card-background);
  z-index: 1;
  position: relative;
  overflow: hidden;
  padding: 40px 0px 40px 20px;
  &::after {
    content: " ";
    pointer-events: none;
    right: 0px;
    height: 600px;
    position: absolute;
    width: 100px;
    top: 0px;
    z-index: 1;
    border-radius: 0px var(--border-radius) var(--border-radius) 0px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--card-background) 98%
    );
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    padding: 20px 0px 40px 0px;
    &::after {
      display: none;
    }
  }
`;

export const StyledBlogListCarousel = styled.div`
  .embla {
    width: 100%;
    max-width: 1080px;
    margin: 0px;
    --slide-height: 19rem;
    --slide-spacing: 1rem;
    --slide-size: 420px;
  }
  .embla__viewport {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    width: 400px;
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
  .embla__slide__number {
    box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
    border-radius: 1.8rem;
    font-size: 4rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--slide-height);
    user-select: none;
  }

  & .embla__controls {
    position: absolute;
    left: 0px;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: 1.2rem;
    margin-top: 1.8rem;
    display: none;
    & .embla__buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.6rem;
      align-items: center;
    }
    & .embla__button {
      -webkit-tap-highlight-color: rgba(
        var(--text-high-contrast-rgb-value),
        0.5
      );
      -webkit-appearance: none;
      appearance: none;
      background-color: transparent;
      touch-action: manipulation;
      display: inline-flex;
      text-decoration: none;
      cursor: pointer;
      border: 0;
      padding: 0;
      margin: 0;
      box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
      width: 3.6rem;
      height: 3.6rem;
      z-index: 1;
      border-radius: 50%;
      color: var(--text-body);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & .embla__button:disabled {
      color: var(--detail-high-contrast);
    }
    & .embla__button__svg {
      width: 35%;
      height: 35%;
    }
  }
`;

export const StyledBlogMainBlock = styled.div`
  padding: 40px 40px 40px 20px;
  /* max-width: 400px; */
  width: 440px;
  min-width: 440px;
  min-height: 400px;
  display: flex;
  & .heading {
    margin-top: auto;
    & h2 {
      font-size: 35px;
      font-family: var(--font-bebas);
      line-height: 40px;
    }
    & p {
      font-size: 15px;
      margin-top: 5px;
      span {
        font-size: 25px;
        line-height: 17px;
      }
    }
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    min-width: 100%;
    min-height: auto;
    padding: 0px 20px 30px 20px;
    display: block;
  }
`;
