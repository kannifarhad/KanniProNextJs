import { blogList } from "@/components/sections/LastFromBlogCarousel/constants";
import BlogItem from "@/components/sections/BlogListItem";
import { StyledBlogListContainer } from "./styled";

const BlogListContainer = () => {
  return (
    <StyledBlogListContainer className="grid gap-4 grid-cols-4">
      {blogList.map((blog) => (
        <div key={blog.id} className="">
          <BlogItem {...blog} />
        </div>
      ))}
    </StyledBlogListContainer>
  );
};

export default BlogListContainer;
