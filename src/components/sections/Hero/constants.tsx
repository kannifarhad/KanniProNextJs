export enum ModelsTypes {
  MOBILE = "MOBILE",
  DEVELOPMENT = "DEVELOPMENT",
  UIUX = "UIUX",
}

export const contentInfo = {
  [ModelsTypes.MOBILE]: {
    image: "/images/mobiledev.png",
    title: (
      <>
        Mobile App <br />
        Development
      </>
    ),
    content: (
      <>
        <div className="element">
          <div>
            <strong>Mobile Development</strong> - <span>2 years</span>
          </div>
        </div>
        <div className="element">
          Building intuitive and high-performing mobile applications is a
          passion of mine. I`ve worked extensively with React Native, crafting
          cross-platform apps that seamlessly deliver exceptional user
          experiences. From development to deployment, I`ve guided mobile
          projects through every stage, ensuring reliability and responsiveness
          across both iOS and Android platforms.
        </div>

        <div className="element">
          While React Native has been my primary tool for mobile app
          development, I also have hands-on experience with Flutter,
          experimenting with its capabilities to create visually stunning and
          performant applications.
        </div>
      </>
    ),
  },
  [ModelsTypes.DEVELOPMENT]: {
    image: "/images/fullstackdev.png",
    title: (
      <>
        FullStack <br />
        Development
      </>
    ),
    content: (
      <>
        <div className="element">
          <div>
            <strong>Backend Development</strong> - <span>9 years</span>
          </div>
          <div>
            <strong>Frontend Development</strong>- <span>12 years</span>
          </div>
        </div>
        <div className="element">
          As a seasoned Full Stack Developer, I specialize in crafting robust,
          scalable applications from concept to production. Over the years, I`ve
          honed my skills across a wide spectrum of technologies, enabling me to
          build seamless user experiences backed by powerful, efficient
          backends.
        </div>

        <div className="element">
          <strong>Frontend Mastery:</strong> My front-end development journey
          spans React, Next.js, Vue.js, and a deep understanding of modern CSS
          methodologies like Tailwind CSS and PostCSS. I design intuitive,
          responsive interfaces that are as delightful to use as they are
          functional. From optimizing legacy codebases to spearheading
          migrations, I ensure performance and usability go hand in hand.
        </div>

        <div className="element">
          <strong> Backend Strength:</strong> With extensive experience in
          Node.js,PHP including frameworks like NestJS and Express.js, I
          architect scalable APIs and services. My backend work adheres to
          domain-driven design principles, ensuring maintainability and
          reliability. I also have experience with GraphQL and RESTful services,
          along with database expertise in PostgreSQL, MongoDB and MySQL.
        </div>
      </>
    ),
  },
  [ModelsTypes.UIUX]: {
    image: "/images/digital-art.png",
    title: (
      <>
        UI/UX and
        <br />
        Graphic Design
      </>
    ),
    content: (
      <>
        <div className="element">
          <div>
            <strong>Backend Development</strong> - <span>9 years</span>
          </div>
          <div>
            <strong>Frontend Development</strong>- <span>12 years</span>
          </div>
        </div>
        <div className="element">
          With 6 years of experience building apps and a creative flair for
          digital art and illustration, I bring a unique perspective to UI/UX
          design. While it’s not my primary focus today, this background has
          become an invaluable asset in my work.This blend of skills empowers me
          to deliver front-end implementations that respect both the designer’s
          vision and the user’s expectations, creating a cohesive and polished
          experience.
        </div>

        <div className="element">
          <strong>Enhanced Collaboration :</strong> My understanding of design
          principles helps me communicate effectively with designers, bridging
          the gap between vision and implementation.
        </div>
        <div className="element">
          <strong>Pixel-Perfect Implementation :</strong> I excel at translating
          design files into flawless, responsive front-end components that look
          and feel exactly as intended.
        </div>
        <div className="element">
          <strong>User-Centric Perspective :</strong> Combining technical
          expertise with an artistic eye, I ensure that applications are not
          only functional but also aesthetically engaging and intuitive.
        </div>
      </>
    ),
  },
};
