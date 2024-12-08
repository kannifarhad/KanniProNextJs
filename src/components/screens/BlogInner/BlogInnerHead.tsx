import InnerLowerHead from "@/components/sections/InnerLowerHead";
import ChipWithIcon from "@/components/ui/Chip";
import React from "react";

const BlogInnerHead: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <InnerLowerHead title={title} subhead={subtitle}>
      <div className="flex gap-2">
        <ChipWithIcon
          icon={{ name: "Calendar", color: "#fff", width: "16px" }}
          title="20 Nov. 2024"
        />
        <ChipWithIcon
          icon={{ name: "Calendar", color: "#fff", width: "16px" }}
          title="Javascript"
        />
      </div>
    </InnerLowerHead>
  );
};

export default BlogInnerHead;
