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
          color="#fff"
          icon={{
            name: "Calendar",
            color: "#D1D4FF",
            width: "16px",
            style: { fill: "#6d73c6" },
          }}
          title="20 Nov. 2024"
        />
        {categories && (
          <ChipWithIcon
            color="#fff"
            icon={{
              name: "Pen",
              color: "#D1D4FF",
              style: { fill: "#6d73c6" },
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
