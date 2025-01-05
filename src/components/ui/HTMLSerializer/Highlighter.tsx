"use client";
import { memo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
export const Highlighter = memo(
  ({
    className,
    remove = "",
    add = "",
    higlight = "",
    children,
    ...properties
  }: Partial<CodeProps>) => {
    const codeString = typeof children === "string" ? children : "";
    if (!className) {
      return (
        <code className="defaultcode" {...properties}>
          {codeString}
        </code>
      );
    }

    const ADDED = add.replace(" ", "").split(",");
    const REMOVED = remove.replace(" ", "").split(",");
    const HIGHLIGHTED = higlight.replace(" ", "").split(",");
    const language = /language-(\w+)/.exec(className || "")?.[1] || "javascript";
    const isBashCode = language !== 'bash' && language !== 'shell';
    
    return (
      <SyntaxHighlighter
        language={language.toLowerCase()}
        {...properties}
        showLineNumbers={isBashCode}
        // wrapLongLines
        style={atomOneDark}
        lineProps={(line: number) => {
          const lineNumber = String(line);
          const style: React.CSSProperties = { display: "block" };
          if (ADDED.includes(lineNumber)) {
            style.backgroundColor = "#53be536d";
          } else if (REMOVED.includes(lineNumber)) {
            style.backgroundColor = "#fb000042";
          } else if (HIGHLIGHTED.includes(lineNumber)) {
            style.backgroundColor = "#bc91fc55";
          }
          return { style };
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    );
  },
  (prevProps, nextProps) => {
    // Compare relevant props to determine if re-render is necessary
    return (
      prevProps.className === nextProps.className &&
      prevProps.remove === nextProps.remove &&
      prevProps.add === nextProps.add &&
      prevProps.higlight === nextProps.higlight &&
      prevProps.children === nextProps.children
    );
  }
);

// Set the display name for better debugging and to resolve the ESLint warning
Highlighter.displayName = "Highlighter";
export default Highlighter;
