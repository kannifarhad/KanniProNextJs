import InnerLowerHead from "@/components/sections/InnerLowerHead";
import BlogItem from "@/components/sections/BlogListItem";
import { StyledBlogListContainer } from "./styled";
import { ArticleList } from "@/types/api";

const CategoryPage = ({ blogList, title, description }: { blogList: ArticleList, title:string, description?: string }) => {
  return (
    <StyledBlogListContainer>
      <InnerLowerHead
        title={title}
        subhead={description}
      />
      <div
        className="grid gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
        style={{ paddingBottom: "100px" }}
      >
        {blogList.map((blog) => (
          <BlogItem key={blog.documentId} {...blog} />
        ))}
      </div>
    </StyledBlogListContainer>
  );
};

export default CategoryPage;
