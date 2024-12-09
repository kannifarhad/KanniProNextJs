"use client";
import styled from "styled-components";

export const StyledRoundBlock = styled.div`
  border-radius: 15px;
  padding: 10px 20px 20px 20px;
  width: 100%;
  background: var(--card-background);
  display: flex;
  flex-direction: column;
  & .blockContent {
    margin-top: auto;
  }
`;
