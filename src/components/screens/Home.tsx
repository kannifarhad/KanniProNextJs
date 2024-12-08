import HomeAbout from "../sections/HomeAbout";
import HomeWorkHistory from "../sections/HomeWorkHistory";
import ContactMe from "../sections/ContactMe";
import BlogList from "../sections/LastFromBlogCarousel";
import Hero from "@/components/sections/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeWorkHistory />
      <ContactMe />
      <BlogList />
    </>
  );
};

export default Home;
