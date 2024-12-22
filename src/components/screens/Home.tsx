import HomeAbout from "../sections/HomeAbout";
import HomeWorkHistory from "../sections/HomeWorkHistory";
import ContactMe from "../sections/ContactMe";
import LastFromBlogCarousel from "../sections/LastFromBlogCarousel";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeWorkHistory />
      <ContactMe />
      <LastFromBlogCarousel />
    </>
  );
}
