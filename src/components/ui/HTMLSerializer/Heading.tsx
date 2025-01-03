import { slugify } from "@/helpers/slugify";

interface HeadingProps {
  children: React.ReactNode;
  id?: string;
}

// Heading component factory
// eslint-disable-next-line react/display-name
const Heading = (Tag: keyof JSX.IntrinsicElements) => ({ children, id }: HeadingProps) => {
    const slug = id || slugify(children?.toString() || "");
    return (
      <Tag id={slug} className="group">
        <a
          href={`#${slug}`}
          className="opacity-0 group-hover:opacity-100 text-gray-500 transition-opacity duration-300 headingLinks"
          aria-label="Link to this heading"
        >
          #
        </a>
        {children}
      </Tag>
    );
};
// Set the display name for better debugging and to resolve the ESLint warning
Heading.displayName = "Heading";
export default Heading;
