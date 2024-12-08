"use client";
import styled from "styled-components";

export const StyledContactMe = styled.div`
  padding: 200px 20px 200px 20px;
  position: relative;
  overflow: hidden;
  & .head {
    max-width: 800px;
    text-align: center;
    font-size: 90px;
    font-family: var(--font-bebas);
  }
  & .contact-info {
    pointer-events: none;
    position: relative;
    z-index: 2;
    & .connect-image {
      border-radius: 50%;
      background: linear-gradient(transparent 45%, #6c6c6c33 80%);
      fill: var(--foreground);
    }
  }
  & .contact-buttons {
    width: 100%;
    padding-top: 30px;
    button {
      z-index: 2;
    }
  }
`;

export const StyledLampsContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: absolute;
  z-index: 0;
  top: 0px;
  opacity: 0.4;
  filter: blur(4px);
  & .lampscont {
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
    height: 720px;
  }
  & .lamp {
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
    background-position: bottom center;
    background-repeat: no-repeat;
    filter: var(--lampContFilter);
    & img {
      filter: var(--lampImageFilter);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
      opacity: 0;
      max-width: none;
      -webkit-transition: opacity 0.3s;
      -moz-transition: opacity 0.3s;
      -o-transition: opacity 0.3s;
      transition: opacity 0.3s;
    }
    &:hover img {
      opacity: 1;
      -webkit-transition: opacity 0.3s;
      -moz-transition: opacity 0.3s;
      -o-transition: opacity 0.3s;
      transition: opacity 0.3s;
    }
    &.lamp1 {
      width: 238px;
      height: 567px;
      position: absolute;
      top: -50px;
      left: 50px;
      & img {
        position: absolute;
        bottom: -130px;
        left: -148px;
      }
    }
    &.lamp2 {
      width: 125px;
      height: 530px;
      position: absolute;
      top: -150px;
      left: 350px;
      & img {
        position: absolute;
        bottom: -152px;
        left: -163px;
      }
    }
    &.lamp3 {
      width: 110px;
      height: 463px;
      position: absolute;
      top: -150px;
      left: 550px;
      & img {
        position: absolute;
        bottom: -128px;
        left: -135px;
      }
    }
    &.lamp4 {
      width: 91px;
      height: 437px;
      position: absolute;
      top: -150px;
      left: 750px;
      & img {
        position: absolute;
        bottom: -65px;
        left: -75px;
      }
    }
    &.lamp5 {
      width: 71px;
      height: 481px;
      position: absolute;
      top: -150px;
      left: 850px;
      & img {
        position: absolute;
        bottom: -62px;
        left: -65px;
      }
    }
  }
`;
