import LastFromBlog from "./LastFromBlog";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function LastFromBlogCarousel() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <LastFromBlog />
    </ErrorBoundary>
  );
}
