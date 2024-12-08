import styled from "styled-components";

export const StyledHomeMouse = styled.div`
  & .ChipWithIcon {
    max-width: fit-content;
    background: var(--background);
    pointer-events: none;
    opacity: 0.9;
    & .title {
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      animation: typing 1s steps(30, end);
    }
    /* Typing animation */
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 75%;
      }
    }
  }
`;
