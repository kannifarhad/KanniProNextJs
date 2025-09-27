import { memo } from "react";
import { StyledBlogItem } from "./styled";
import Link from "next/link";
import { ArticleListItem } from "@/types/api";
import { getImagePath } from "@/helpers/common";

const BlogListItem = ({ title, slug, categories, cover }: ArticleListItem) => {
  return (
    <Link href={`/blog/${slug}`}>
      <StyledBlogItem
        style={{ backgroundImage: `url(${getImagePath(cover.url)})` }}
      >
        <div className="shortStory">
          <div className="categoryList">
            {categories?.map((cat) => (
              <span key={cat.name}>{cat.name}</span>
            ))}
          </div>
          <div className="readmore">{title}</div>
        </div>
      </StyledBlogItem>
    </Link>
  );
};

export default memo(BlogListItem);
