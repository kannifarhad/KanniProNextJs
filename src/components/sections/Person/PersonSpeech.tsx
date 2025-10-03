"use client";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SpeechBubble from "@/components/ui/SpeechBubble";
import Button from "@/components/ui/Button";

export interface Bubble {
  id: string;
  content: string | ReactNode;
}

export interface PersonSpeechRef {
  addBubble: (bubble: Bubble) => void;
  resetBubble: () => void;
}

export const suggestDance = (onClick: () => void): Bubble => ({
  id: "wannaSeeDance",
  content: (
    <div className="flex gap-2 flex-col">
      <span>
        Hey there, human! I can’t do much yet… Farhad’s still coding my brain 🧠✨ But I can bust a move if you’re brave
        enough to watch
      </span>
      <div className="flex justify-center">
        <Button handleClick={onClick} color="green" style={{ padding: "7px 15px" }} title="🕺 Dance"></Button>
      </div>
    </div>
  ),
});

export const askDanceFeedBack = ({
  onDislikeClick,
  onLikeClick,
}: {
  onLikeClick: () => void;
  onDislikeClick: () => void;
}): Bubble => ({
  id: "wannaSeeDance",
  content: (
    <div className="flex gap-2 flex-col">
      <span>Sooo… what did you think of my moves? Be honest (but not too honest 🥺) Did you like it?</span>
      <div className="flex gap-2 flex-row justify-center">
        <Button color="green" handleClick={onLikeClick} title="Yes 👍" style={{ padding: "7px 15px" }} />
        <Button
          variant="outlined"
          color="primary"
          handleClick={onDislikeClick}
          title="No 👎"
          style={{ padding: "7px 15px" }}
        />
      </div>
    </div>
  ),
});

export const contactMe = (): Bubble => ({
  id: "contactMe",
  content: (
    <div className="flex gap-2 flex-col">
      <span>Let’s team up! You bring the project, I’ll bring the ☕ and code.</span>
    </div>
  ),
});

export const heroSpeech = (): Bubble => ({
  id: "heroSpeech",
  content: (
    <div className="flex gap-2 flex-col">
      <span>Hey! I’m Farhad’s tiny helper — welcome! 👋 Click the gadgets to see more infomration or hover on me if you want a dance break.</span>
    </div>
  ),
});

const PersonSpeech = forwardRef<PersonSpeechRef>((_, ref) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useImperativeHandle(ref, () => ({
    addBubble: (bubble: Bubble) => {
      setBubbles((prev) => {
        const isExists = prev.find((bub) => bub.id === bubble.id);
        if (isExists) return prev;
        return [...prev, bubble];
      });
    },
    resetBubble: () => {
      setBubbles([]);
    },
  }));

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bottom: "200px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <SpeechBubble
            key={bubble.id}
            initial={{ opacity: 0, y: 50, x: 20, scale: 0.1 }}
            animate={{ opacity: 1, y: -50, x: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {bubble.content}
          </SpeechBubble>
        ))}
      </AnimatePresence>
    </div>
  );
});

PersonSpeech.displayName = "PersonSpeech";
export default PersonSpeech;
