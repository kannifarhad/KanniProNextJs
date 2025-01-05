"use client";
import { memo } from "react";
import Button from "@/components/ui/Button";

const contactMe = {
  whatsap: "+306975758827",
  mail: "farhad@kanni.pro",
  subject: "Hi, Farhad",
  body: "Hi, Farhad",
};

const ContactButtons = () => {
  return (
    <div className="contact-buttons flex flex-row items-center justify-center gap-5">
      <Button
        title="E-mail me"
        color="green"
        icon={{ name: "Paperplane" }}
        handleClick={() => {
          window.open(
            `mailto:${contactMe.mail}?&subject="${contactMe.subject}"&body="${contactMe.body}"`
          );
        }}
      />

      <Button
        title="WhatsApp"
        variant="outlined"
        color="primary"
        icon={{ name: "Whatsapp" }}
        handleClick={() => {
          window.open(
            `https://wa.me/${contactMe.whatsap}?text=${encodeURIComponent(
              contactMe.subject
            )}`
          );
        }}
      />
    </div>
  );
};

export default memo(ContactButtons);
