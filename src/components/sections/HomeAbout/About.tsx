import RoundBlock from "@/components/ui/RoundBlock";
import { memo } from "react";
import ChipWithIcon from "@/components/ui/Chip";

const About = () => {
  return (
    <RoundBlock
      heading={{
        title: "About me",
        subTitle: "A Curious Creator with a Passion for Building and Exploring",
      }}
      className="about-me "
    >
      <div className="flex gap-2 items-center flex-wrap mt-2 mb-4">
        <ChipWithIcon
          icon={{ name: "Loaction", color: "#fff", width: "20px" }}
          title="Athens, Greece"
        />
        <ChipWithIcon
          icon={{ name: "Email", color: "#fff", width: "18px" }}
          title="farhad@kanni.pro"
        />
        <ChipWithIcon
          icon={{ name: "Whatsapp", color: "#fff", width: "20px" }}
          title="(+30) 697-575-8827"
        />
      </div>
      <div style={{ paddingLeft: "5px" }}>
        <p>
          Hello! I`m a passionate Full Stack Developer with over a decade of
          experience crafting software solutions that blend functionality,
          scalability, and exceptional user experiences. My journey in tech has
          taken me from freelancing to working with global companies, tackling
          diverse challenges and honing my expertise along the way.
        </p>
        <p style={{ marginTop: "10px" }}>
          <strong>Broad Technical Expertise:</strong> With 7+ years of
          experience in Node.js and 6 years in PHP, I`ve built everything from
          robust APIs to complex microservices and scalable backends. On the
          front end, I specialize in React, Next.js, and Vue.js, creating
          intuitive, responsive, and performant interfaces.
          <br />
          <strong> Mobile Development:</strong> I`ve developed and deployed
          cross-platform mobile apps with React Native and explored Flutter,
          adding flexibility to my skill set.
          <br />
          <strong> UI/UX Insight:</strong> My background in UI/UX design and
          digital art empowers me to implement visually polished and
          user-friendly designs, collaborating seamlessly with designers to
          deliver pixel-perfect results.
        </p>
        <p style={{ marginTop: "10px" }}>
          <strong>Beyond the Code:</strong> I`m not just about tech! I enjoy
          exploring aquariums, traveling (having visited 27 countries), staying
          fit, and diving into jazz classics by Chet Baker and Miles Davis. My
          hobbies in digital art and illustration keep my creativity sharp,
          adding a unique edge to my projects. Whether building enterprise
          platforms or collaborating on innovative SaaS solutions, I thrive on
          solving problems, mentoring teams, and delivering impactful software.
        </p>
      </div>
    </RoundBlock>
  );
};

export default memo(About);
