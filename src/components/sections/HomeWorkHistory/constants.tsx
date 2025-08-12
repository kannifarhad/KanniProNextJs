import React, { ReactNode } from "react";
import { JobHistoryItemType } from "./JobListItem";

export const workHistoryList: Array<JobHistoryItemType & { fullstory: ReactNode; technologiesUsed?: string[] }> = [
  {
    name: "Code2Day.",
    position: "Software Architect & Team Lead",
    dates: "Dec. 2024 - Current",
    fullstory: (
      <div>
        <ul>
          <li>
            Led the architecture and full-stack development of a Conversational AI platform designed to handle phone calls and manage scheduling through integrations with three third-party systems.
          </li>
          <li>Built and maintained the front-end using React, TypeScript, RTK, TanStack Query/Table/Grid and Jest for testing.</li>
          <li>Developed scalable back-end services with Node.js, PostgreSQL, and Sequelize.</li>
          <li>Designed and implemented adaptors to bridge AI workows with external scheduling systems and client-specic APIs</li>
          <li>Delivered dashboards for client onboarding, call monitoring, and log analysis, improving operational visibility</li>
          <li>Conducted onboarding, technical interviews, and mentoring of new team members to ensure high engineering standards</li>
          <li>Collaborated with cross-functional teams to align product goals with business needs and user feedback.</li>
          <li>Facilitated sprint planning, task breakdown, and backlog grooming in coordination with the product owner.</li>
        </ul>
      </div>
    ),
    technologiesUsed: [
      "React",
      "Redux-Toolkit",
      "RTK Query",
      "JavaScript",
      "TypeScript",
      "MUI",
      "Styled-Components",
      "NodeJs",
      "Jest",
      "Redis",
      "NestJs",
      "LLMs",
      "OpenAi",
      "LangChain",
      "Ollama",
      "Vector DB/ PostgresVector",
      "RAG",
      "NodeJs",
      "Sequalize",
      "PostgreSQL",
      "MongoDB",
      "Microservices",
      "AWS",
      "Jira",
      "Confluence",
      "Agile",
    ],
  },
  {
    name: "Upwork Inc.",
    position: "Senior Software Engineer",
    dates: "May 2023 Nov. 2024",
    fullstory: (
      <div>
        I was part of the Marketplace team at Upwork, responsible for essential platform components such as job apply, interviews, profile settings, accounts and more.
        <ul>
          <li>Implemented new features, projects (referral program, AI integrations, bid system and etc.) on platform using technologies such as Nuxt, Vue, Javascript, PHP, Java and more.</li>
          <li>Led migrations from REST to GraphQL with optimizing data fetching and enhancing flexibility in API interactions and increased productivity by 54%.</li>
          <li>Had done migration into Vue 3 version in platform pages including configuring Jenkins pipelines, Alert, Web Performance tests, CI/CD by following corporate guidlines and standarts.</li>
          <li>Increased test coverage across all team projects to a minimum of 95%.</li>
          <li>Worked closely with the UI/UX team to implement new branding and develop UI kits for team-managed pages.</li>
          <li>Collaborated closely with the Technical Support team and directly with customers to resolve bugs swiftly, ensuring minimal impact on project timelines and other feature deadlines.</li>
        </ul>
      </div>
    ),
    technologiesUsed: [
      "Vue",
      "Nuxt",
      "Vuex",
      "JavaScript",
      "TypeScript",
      "Jest",
      "Cypress",
      "Flutter",
      "PHP",
      "Symphony",
      "Angular",
      "Jenkins",
      "Java",
      "AWS",
      "GraphQl",
      "Jira",
      "Confluence",
      "Grafana",
      "Elasticsearch",
      "Kibana",
      "MicroFrontend",
      "MicroServices",
    ],
  },
  {
    name: "SysAid",
    position: "Senior Fullstack Developer",
    dates: "Jan. 2023 Jun. 2023",
    fullstory: (
      <div>
        SysAid offers a SaaS (Software as a Service) platform that helps organizations manage support tickets, automate workflows, and enhance incident resolution through features like asset
        management, customizable forms, and AI-powered support tools.
        <ul>
          <li>
            Worked on new version of product that had been released this year. Implemented projects related to core functionality of product as well as features related to ticket queue, templates,
            workflows, AI integrations with Copilot and many other.
          </li>

          <li>Used technologies such as React, RTK( Redux-Toolkit), React-Query, Javascript, Typescript, Jest, Cypres, Azure and more.</li>

          <li>
            Identified and resolved long-standing memory leaks and performance issues, reducing page load times from 40 seconds to 2 seconds and optimizing heap memory usage from 700 MB–1.2 GB to
            80–90 MB.
          </li>

          <li>
            Mentored new developers during onboarding, providing guidance on understanding the codebase, infrastructure, and company workflows. Held one-on-one calls with new developers to resolve
            blockers, guiding them through challenges with their PRs.
          </li>

          <li>
            Suggested and implemented architectural changes to improve the app`s structure and long-term maintainability. Created presentation within pros and cons including detailed comparison with
            technologies that used meantime.
          </li>

          <li>
            Collaborated closely with the backend team (working in Java) to review and provide feedback on pull requests (PRs) related to business logic, ensuring proper integration with the front
            end.
          </li>

          <li>Participated in customer calls to resolve reported bugs, helping deliver faster fixes and improve overall user satisfaction.</li>
        </ul>
      </div>
    ),
    technologiesUsed: [
      "React",
      "Redux-Toolkit",
      "ReactQuery",
      "JavaScript",
      "TypeScript",
      "MUI",
      "Styled-Components",
      "Jest",
      "Sentry",
      "Cypress",
      "Java",
      "SpringBoot",
      "Jenkins",
      "AWS",
      "GraphQl",
      "Jira",
      "Confluence",
      "Agile",
      "Nexus",
    ],
  },
  {
    name: "Johnson & Johnson",
    position: "Senior Fullstack Developer",
    dates: "Sept. 2021 Jan. 2023",
    fullstory: (
      <div>
        Worked on the development of a platform (MLOps) designed to integrate multiple tools used by scientists for drug research to make deploying machine learning workflows easly. Also it enabled
        easier commmunication for different teams inside Jhonson&Jhonson to collabrate and share resources between projects. The project enabled to create end-to-end workflows that connected MLOps
        tools via a user-friendly interface, eliminating the need for manual configuration and reducing reliance on DevOps teams, allowing users to easily create and manage multiple research projects.
        <ul>
          <li>To build front-end side we used React, RTK, TypeScript, Ant-Design and SCSS to develop app from scratch. Heavily utilized TypeScript to improve code quality, provide type safety.</li>
          <li>
            On backend side we implmented Domain-Driven-Design within Microservice architecture by using GraphQL, ApolloFederation, NestJs, TypeScript, Prisma, PostgreSQL, MongoDB and other
            technologies. Also backend had been integrated with variety of tools such as: Argo, Seldon, Domino, Jupyter Notebooks, Git, Kubernets, PyPi, and LDAP, enabling seamless collaboration and
            research workflows.
          </li>
          <li>Emphasized best practices in both front-end and back-end development principles such as DRY (Don`t Repeat Yourself), KISS (Keep It Simple, Stupid), and SOLID design principles.</li>
          <li>The project reduced scientists research time by 60%, significantly accelerating workflows and boosting productivity.</li>
        </ul>
      </div>
    ),
    technologiesUsed: [
      "React",
      "Redux-Toolkit",
      "JavaScript",
      "TypeScript",
      "ANT-design",
      "Styled-Components",
      "NestJs",
      "Jest",
      "Cypress",
      "Sentry",
      "DataDog",
      "NodeJs",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Apollo Federation",
      "Microservices",
      "Agora",
      "Jupyter Notebooks",
      "PyPi",
      "Kubernets",
      "Jenkins",
      "AWS",
      "GraphQl",
      "Jira",
      "Confluence",
      "Agile",
    ],
  },
  {
    name: "Bank Republic",
    position: "Team Lead",
    dates: "Aug. 2018 Sept. 2021",

    fullstory: (
      <div>
        <ul>
          <li>
            Led multiple teams in executing a core banking migration from a legacy system to a modernized platform, overseeing all phases of development, project planning and implementing all of them
            as well.
          </li>
          <li>Designed and built the front-end and back-end architecture from strach for a new platform used by bank employees to manage and execute all banking operations and services.</li>
          <li>Implemented microfrontend architecture to build UI of platform using tools such as Webpack federation, React, Redux, TypeScript, MUI, SCSS.</li>
          <li>
            On back-end worked technologies such as ExpressJs, PHP, Java (SpringBoot), OracleDB, PostgreSQL, MongoDB, CamundaBMPN, Nomad, Consol, Dockers, ELK and etc. Microservice architecture had
            been implemented.
          </li>

          <li>Interviewed, onboarded and mentored more than 30 employees each on front-end and back-end teams.</li>

          <li>
            Implementing the BPMN approach on the back-end and a microfrontend architecture on the front-end reduced new project development time by 50%, simplified bug debugging, and decreased
            deployment time from 2-3 hours to just 30 minutes.
          </li>

          <li>All migrations resulted in a 4-5 times reduction in client service time by streamlining bank processes and simplifying workflows for employees, significantly improving efficiency.</li>
          <li>
            Proactively suggested and presented architectural changes to the management and employees of a bank, by developing comprehensive presentations and organizing strategic meetings to align on
            key improvements.
          </li>
        </ul>
      </div>
    ),
    technologiesUsed: [
      "React",
      "Redux-Toolkit",
      "ReactQuery",
      "JavaScript",
      "TypeScript",
      "MUI",
      "Styled-Components",
      "MicroFrontend",
      "Jest",
      "PHP",
      "Twig",
      "NodeJs",
      "MicroServices",
      "PostgreSQL",
      "SQL",
      "Oracle DB",
      "MongoDB",
      "Java",
      "Kafka",
      "Redis",
      "RabbitMQ",
      "SpringBoot",
      "Nomad",
      "Grafana",
      "Elasticsearch",
      "Kibana",
      "Jira",
      "Confluence",
      "Agile",
      "Sentry",
    ],
  },
  {
    name: "Previous Jobs & Freelance",
    position: "Senior fullstack developer",
    dates: "May. 2012 Aug. 2018",
    fullstory: (
      <div>
        <p>
          From September 2012 to August 2018, I contributed to a variety of projects across different industries, developing web applications, creating custom software tools, and overseeing digital
          content creation and marketing campaigns.
        </p>
        <p>
          At AK Mobile, I focused on full-stack development, creating and supporting web projects, extensions, and apps, with a strong emphasis on PHP, JavaScript, React, and UI/UX design. My work
          ranged from building custom products to providing ongoing support and monitoring for various web platforms.
        </p>
        <p>
          In my role at Sport Marketing Group, I developed apps and web-based platforms designed to improve productivity, such as task management systems, as well as solutions to support sports
          events. I was also involved in web design and UI/UX development, leveraging my skills to build engaging and functional web applications.
        </p>
        <p>
          As Chief Specialist at Bank Technique, I combined my technical background with a focus on digital marketing, creating and monitoring digital content for the bank’s online presence. I helped
          brainstorm and execute creative marketing campaigns and assisted in analyzing marketing data—such as conversion rates and campaign results—to help shape future strategies.
        </p>
      </div>
    ),
    technologiesUsed: [
      "React",
      "Redux-Toolkit",
      "ReactQuery",
      "JavaScript",
      "TypeScript",
      "MUI",
      "Styled-Components",
      "Jest",
      "Cypress",
      "Java",
      "SpringBoot",
      "Jenkins",
      "AWS",
      "GraphQl",
      "Jira",
      "Confluence",
      "Agile",
    ],
  },
];
