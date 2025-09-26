import HomeAbout from "../sections/HomeAbout";
import HomeWorkHistory from "../sections/HomeWorkHistory";
import ContactMe from "../sections/ContactMe";
import LastFromBlogCarousel from "../sections/LastFromBlogCarousel";
import Hero from "@/components/sections/Hero";
import SectionsObserver from "../sections/SectionsObserver";
import Person from "../sections/Person";

export default function Home() {
  return (
    <div className="max-[900px]:overflow-x-hidden">
      <Hero />
      <HomeAbout />
      <HomeWorkHistory />
      <ContactMe />
      <LastFromBlogCarousel />
      <SectionsObserver />
      <Person />
    </div>
  );
}
