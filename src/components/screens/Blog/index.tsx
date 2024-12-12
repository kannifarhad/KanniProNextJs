import InnerLowerHead from "@/components/sections/InnerLowerHead";
import { blogList } from "@/components/sections/LastFromBlogCarousel/constants";
import BlogItem from "@/components/sections/BlogListItem";
import { StyledBlogListContainer } from "./styled";

const BlogPage = () => {
  return (
    <StyledBlogListContainer>
      <InnerLowerHead
        title="Blog: Random things I built, develop and care about"
        subhead="Because spending countless hours debugging and perfecting something no one asked for is definitely my idea of fun. 🤷🏻‍♂️"
      />
      <div
        className="grid gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
        style={{ paddingBottom: "100px" }}
      >
        {blogList.map((blog) => (
          <div key={blog.id} className="">
            <BlogItem {...blog} />
          </div>
        ))}
      </div>
    </StyledBlogListContainer>
  );
};

export default BlogPage;
