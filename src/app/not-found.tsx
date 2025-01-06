import NotFound from "@/components/screens/NotFound";
import generateMetadata from "@/helpers/generateMetadata";

export const metadata = generateMetadata({
  title: "OOops, page not found | Farhad Aliyev",
  description: "The page you looking for has vanished into the digital void. But hey, my portfolio’s still here!",
});

export default function NotFoundPage() {
  return <NotFound />;
}
