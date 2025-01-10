import InnerLowerHead from "@/components/sections/InnerLowerHead";
import ChipWithIcon from "@/components/ui/Chip";
import { Article } from "@/types/api";
import React from "react";
import { getImagePath } from "@/helpers/common";
import formatDate from "@/helpers/formatDate";

type BlogInnerHeadProps = Pick<
  Article,
  "title" | "description" | "categories" | "createdAt" | "cover"
>;

const BlogInnerHead: React.FC<BlogInnerHeadProps> = ({
  title,
  description,
  cover,
  categories = [],
  createdAt
}) => {
  return (
    <InnerLowerHead title={title} subhead={description} image={getImagePath(cover.url)}>
      <div className="flex flex-wrap gap-2">
        <ChipWithIcon
          color="#fff"
          icon={{
            name: "Calendar",
            color: "#D1D4FF",
            width: "16px",
            style: { fill: "#6d73c6" },
          }}
          title={formatDate(createdAt)}
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
