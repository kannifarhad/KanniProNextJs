import { memo } from "react";
import { StyledBlogItem } from "./styled";
import Link from "next/link";

export type BlogListItemType = {
  title: string;
  id?: number;
  thumb?: string;
  categories?: string[];
};

const BlogListItem = ({ title, id, categories }: BlogListItemType) => {
  return (
    <Link href={`/blog/${id}`}>
      <StyledBlogItem style={{ backgroundImage: "url(/images/photo.jpg)" }}>
        <div className="shortStory">
          <div className="categoryList">
            {categories?.map((cat) => (
              <span key={cat}>{cat}</span>
            ))}
          </div>
          <div className="readmore">{title}</div>
        </div>
      </StyledBlogItem>
    </Link>
  );
};

export default memo(BlogListItem);
