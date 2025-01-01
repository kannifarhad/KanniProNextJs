"use client";
import styled from "styled-components";

export const StyledHeader = styled.header`
  & .nav-wrapper {
    height: 60px;
  }

  & .mobile-menu {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
`;
