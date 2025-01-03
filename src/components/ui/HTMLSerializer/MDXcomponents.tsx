"use client";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { AnchorHTMLAttributes, DetailedHTMLProps, useState } from "react";
import { StyledCodeBlock, StyledInfoBox } from "./styled";
import Button from "../Button";
import Highlighter from "./Highlighter";
type ComponentWithChildProps<P> = React.PropsWithChildren<P>;

// Define the type for the Code props
interface CodeProps {
  children: ComponentWithChildProps<{ props: CodeProps }>;
  className: string;
  name?: string;
  remove?: string;
  add?: string;
  higlight?: string;
}

export function Code({ children, name , ...rest }: CodeProps) {
  const [buttonText, setButtonText] = useState("Copy");
  const language =
    /language-(\w+)/.exec(children.props?.className || "")?.[1] || "javascript";

  const handleCopyCode = async () => {
    const codeString =
      typeof children?.props?.children === "string"
        ? children.props.children
        : "";
    try {
      if (typeof codeString === "string" && codeString.trim() !== "") {
        await navigator.clipboard.writeText(codeString);
        setButtonText("Copied!");
      }
    } catch (err) {
      console.error("Failed to copy code:", err);
      setButtonText("Error!");
    }
    setTimeout(() => setButtonText("Copy"), 1000);
  };

  return (
    <StyledCodeBlock>
      <div className="codehead">
        <div className="codetitle">
          {/* <div className="macbuttons">
            <span />
            <span />
            <span />
          </div> */}
          <div className="name">
            <span>{language}</span> {name && `: ${name}` }
          </div>
        </div>
        <div className="codetoolbox">
          <Button
            icon={{
              name: "Copy",
              className: "copyCodeIcon",
              style: {
                width: "20",
                height: "20",
                fill: "#6d73c6",
                marginRight: "10px",
              },
            }}
            variant="text"
            className="copyCode"
            handleClick={handleCopyCode}
            title={buttonText}
          />
        </div>
      </div>
      <div className="codeblock">
        {children?.props ? <Highlighter {...rest} {...children.props} /> : null}
      </div>
    </StyledCodeBlock>
  );
}

// Define the type for the CustomLink props
interface CustomLinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
}

// CustomLink component
export function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

// Define the type for the RoundedImage props
interface RoundedImageProps extends ImageProps {
  alt: string;
}

// RoundedImage component
export function RoundedImage({ alt, ...props }: RoundedImageProps) {
  return (
    <Image
      alt={alt}
      width="100"
      height="100"
      className="rounded-lg roundedImage"
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InfoBox(props: any) {
  return <StyledInfoBox {...props} />;
}
