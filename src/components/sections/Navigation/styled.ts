"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledHeaderRight = styled.div`
  width: 350px;
  height: 100%;
  margin-left: auto;
  position: relative;
  &::after {
    --pillar-size: var(--border-radius);
    position: absolute;
    content: "";
    bottom: 0px;
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
  button {
    z-index: 10;
    & .title {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 16px;
    }
  }
`;

export const StyledHeaderLeft = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius) var(--border-radius) 0px 0px;
  background: var(--head-background);
  padding: 10px 30px 0px;
  & .logo {
    font-weight: 600;
    font-family: var(--font-bebas);
    font-size: 27px;
    margin-right: 50px;
    color: var(--dark-grey);
  }
`;

export const StyledHeaderNavigation = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  nav {
    list-style: none;
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  & .nav-link {
    position: relative;
    overflow: hidden;
    font-size: 17px;
    color: var(--text-onlight-color);
  }
  & .nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease-out;
  }
  & .nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

export const StyledHeader = styled.div`
  & .nav-wrapper {
    height: 60px;
  }

  & .mobile-menu {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
`;

export const StyledMobileNavCont = styled(motion.div)`
  background: var(--head-background);
  position: fixed;
  z-index: 10;
  left: 0px;
  overflow: hidden;
  & .burgerMenu {
  }
`;

export const StyledMobNavWrap = styled(motion.div)`
  background: var(--head-background);
  padding-top: 70px;
  ul {
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    li {
      font-size: 40px;
      letter-spacing: 2px;
      font-family: var(--font-bebas);
      position: relative;
      a {
        color: var(--text-onlight-color) !important;
      }
      /* top: 20px; */
    }
  }
`;

export const StyledBurgerMenu = styled.div`
  margin-left: auto;
  background: var(--head-background);
  padding: 5px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  border-radius: 50%;
  button {
    width: 50px;
    height: 50px;
    & span {
      background: var(--background);
    }
  }
  & .w-10 {
    width: 30px;
  }
  & .w-5 {
    width: 15px;
  }
  & .h-1 {
    height: 3px;
  }
`;
