"use client";
import styled from "styled-components";

export const StyledHeroInfo = styled.div`
  background-color: var(--head-background);
  background-size: 500px;
  background-position: right bottom;
  background-repeat: no-repeat;
  padding: 40px 20px 40px 0px;
  height: var(--hero-height);
  border-radius: 0px var(--border-radius) var(--border-radius) 0px;
  position: relative;
  &::after {
    --pillar-size: 40px;
    z-index: 1;
    content: "";
    position: absolute;
    transform: rotate(90deg);
    bottom: -80px;
    left: 0px;
    width: calc(var(--pillar-size) * 2);
    height: calc(var(--pillar-size) * 2);
    background: radial-gradient(
        circle at 100% 0%,
        transparent var(--pillar-size),
        var(--head-background) calc(var(--pillar-size) + 1px)
      )
      0px var(--pillar-size) / calc(100% - var(--pillar-size)) 100% no-repeat;
  }

  & .heading {
    position: relative;
    left: -100px;
    top: 210px;
    & h4 {
      -webkit-text-stroke: 1px var(--background);
      color: transparent;
      font-family: var(--font-bebas);
      font-size: 130px;
      font-weight: 500;
      line-height: 100px;
    }
    h3 {
      color: #636363;
      font-family: var(--font-bebas);
      font-size: 50px;
      font-weight: 500;
      line-height: 96px;
      top: 26px;
      left: 0px;
      position: absolute;
    }
    & .shortInfo {
      color: var(--text-onlight-color);
    }
  }

  @media (width <= 900px) {
    background-position: left bottom;
    z-index: 2;
    border-top-right-radius: 0px;
    & .heading {
      left: 0px;
      padding-left: 30px;
      h3 {
        position: relative;
        margin-top: -50px;
        color: #fff;
      }
      & .shortInfo {
        color: #fff;
      }
    }
    &::after {
      display: none;
    }
  }
`;

export const StyledHero3D = styled.div`
  border-radius: 0px 0px var(--border-radius) var(--border-radius);
  background: var(--head-background);

  .hero3d {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: calc(var(--hero-height) + 150px);
    /* position: absolute; */
    top: 0px;
    left: 0px;
    /* border-radius: 0px 0px var(--border-radius) var(--border-radius); */
    border-radius: var(--border-radius);
    background: linear-gradient(
      42deg,
      rgba(163, 163, 251, 1) 0%,
      var(--head-background) 60%
    );
  }
`;

export const StyledheroInfoBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(132 135 211 / 50%);
  backdrop-filter: blur(10px);
  top: 0px;
  left: 0px;
  transform: scale(0.001);
  z-index: 99;
  border-radius: 50%;
  transition: all 0.4s ease-in-out;
  /* pointer-events: none; */
  opacity: 0;
  padding: 30px;

  & .infoBoxContainer {
    padding-top: 30px;
    height: 100%;
    & > .flex {
      height: 100%;
    }
    & .close {
      position: absolute;
      right: 15px;
      top: 15px;
      & button {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        padding: 12px;
      }
    }
    & .coverImage {
      min-width: 40%;
      position: relative;
      height: 100%;
      padding-right: 30px;

      &::after {
        content: " ";
        position: absolute;
        height: 90%;
        width: 1px;
        right: 0px;
        display: block;
        background: #fff;
      }
    }
  }
  &.showInfo {
    transform: scale(1);
    opacity: 1;
    border-radius: var(--border-radius);
    transition: all 0.2s ease-in-out;
  }
  & .infoBlock {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 30px;
    gap: 20px;
    align-items: flex-start;
    h2 {
      font-family: var(--font-bebas);
      font-size: 50px;
      line-height: 45px;
      align-self: baseline;
      text-shadow: 4px 4px rgb(255 255 255 / 39%);
    }
    & .element {
      opacity: 0; /* Start hidden */
      transform: translateY(50px); /* Start 50px lower */
      animation: fadeInUp 0.6s ease forwards; /* Apply animation */
      color: #fff;
    }

    & .element:nth-child(1) {
      animation-delay: 0s;
    }

    & .element:nth-child(2) {
      animation-delay: 0.2s;
    }

    & .element:nth-child(3) {
      animation-delay: 0.4s;
    }

    & .element:nth-child(4) {
      animation-delay: 0.6s;
    }

    & .element:nth-child(5) {
      animation-delay: 0.8s;
    }
    & .element:nth-child(6) {
      animation-delay: 1s;
    }
  }

  /* Define the animation */
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
