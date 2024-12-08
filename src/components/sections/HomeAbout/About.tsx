import RoundBlock from "@/components/ui/RoundBlock";
import { memo } from "react";
import ChipWithIcon from "@/components/ui/Chip";

const About = () => {
  return (
    <RoundBlock
      heading={{
        title: "About me",
        subTitle: "The technologies Im most skilled of",
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
          As a dedicated Full Stack Developer with over a decade of experience,
          I specialize in designing and building high-performance web
          applications with a strong focus on scalability, user experience, and
          seamless integration. My expertise spans both front-end and back-end
          development, enabling me to contribute effectively to projects from
          conception to deployment.
        </p>
        <p style={{ marginTop: "10px" }}>
          <strong>Technical Stack:</strong> Proficient in a wide range of
          technologies. I am experienced in integrating advanced frameworks such
          as React, GraphQL, and NodeJs to build efficient, data-driven
          applications.
        </p>
        <p style={{ marginTop: "10px" }}>
          <strong>Soft Skills:</strong> Known for my collaborative approach, I
          work closely with cross-functional teams to ensure alignment with
          business goals and user needs. I prioritize clean code,
          maintainability, and best practices in all my projects, aiming to
          deliver high-quality, impactful solutions. My commitment to mentoring
          and fostering a culture of continuous learning has contributed to
          cohesive team environments and successful project outcomes.
        </p>
      </div>
    </RoundBlock>
  );
};

export default memo(About);
