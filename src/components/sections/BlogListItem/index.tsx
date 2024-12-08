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
    <StyledBlogItem style={{ backgroundImage: "url(/images/photo.jpg)" }}>
      <div className="shortStory">
        <div className="categoryList">
          {categories?.map((cat) => (
            <span key={cat}>{cat}</span>
          ))}
        </div>
        <Link href={`/blog/${id}`} className="readmore">
          {title}
        </Link>
      </div>
    </StyledBlogItem>
  );
};

export default memo(BlogListItem);
