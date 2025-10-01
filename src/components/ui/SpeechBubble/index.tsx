import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const bubbleGrow = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const bubbleFloat = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(-4px, -6px) scale(1.1);
  }
  50% {
    transform: translate(3px, -2px) scale(0.95);
  }
  75% {
    transform: translate(-2px, 4px) scale(1.05);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
`;

const SpeechBubble = styled(motion.div)`
  filter: url("#gooSmall");
  --bubbleColor: var(--bubbleSpeechColor);
  display: flex;
  flex-direction: column;
  background-color: var(--bubbleColor);
  padding: 15px 15px 10px 15px;
  border-radius: 30px;
  min-width: 40px;
  max-width: 220px;
  min-height: 40px;
  font-size: 13px;
  line-height: 16px;
  margin: 0px 0px 10px 0px;
  font-weight: 500;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* width: fit-content; */
  width: max-content;

  /* Animate the main bubble */
  /* animation: ${bubbleGrow} 0.4s ease-out forwards; */

  &::before,
  &::after {
    filter: url("#gooSmall");
    content: "";
    background-color: var(--bubbleColor);
    border-radius: 50%;
    display: block;
    position: absolute;
    z-index: -1;
    transform: scale(0);
    animation: ${bubbleFloat} 13s ease-in-out infinite; /* 👈 loop */
  }

  &::before {
    filter: url("#gooSmall");
    background: var(--bubbleColor);
    width: 44px;
    height: 44px;
    top: -12px;
    left: 28px;
    box-shadow: -50px 30px 0 -12px var(--bubbleColor);
    animation-delay: 0.2s; /* slightly desynced */
  }

  &::after {
    filter: url("#gooSmall");

    bottom: -10px;
    right: 26px;
    width: 30px;
    height: 30px;
    box-shadow: 40px -34px 0 0 var(--bubbleColor), -28px -6px 0 -2px var(--bubbleColor),
      -24px 17px 0 -6px var(--bubbleColor), -5px 25px 0 -10px var(--bubbleColor);
    animation: ${bubbleFloat} 14s ease-in-out infinite;
  }
`;

export default SpeechBubble;
