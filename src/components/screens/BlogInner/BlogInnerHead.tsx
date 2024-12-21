import InnerLowerHead from "@/components/sections/InnerLowerHead";
import ChipWithIcon from "@/components/ui/Chip";
import { Article } from "@/types/api";
import React from "react";

type BlogInnerHeadProps = Pick<
  Article,
  "title" | "description" | "categories" | "createdAt" | "cover"
>;

const BlogInnerHead: React.FC<BlogInnerHeadProps> = ({
  title,
  description,
  categories = [],
}) => {
  return (
    <InnerLowerHead title={title} subhead={description}>
      <div className="flex gap-2">
        <ChipWithIcon
          icon={{ name: "Calendar", color: "#fff", width: "16px" }}
          title="20 Nov. 2024"
        />
        {categories && (
          <ChipWithIcon
            icon={{
              name: "Calendar",
              color: "#fff",
              width: "16px",
            }}
            title={categories.map((item) => item.name).join(", ")}
          />
        )}
      </div>
    </InnerLowerHead>
  );
};

export default BlogInnerHead;
