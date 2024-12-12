import { RoundBlockProps } from "@/components/ui/RoundBlock";
import { TagProps } from "@/components/ui/Tag";
import { SochialNetworkItem } from "./SochiualNetwork";

type SectionsItems = "primarySkills" | "secondarySkills" | "aboutMe";

export const blocksInfo: Record<
  SectionsItems,
  RoundBlockProps & { skills?: TagProps[] }
> = {
  primarySkills: {
    heading: {
      title: "Primary Skills",
      subTitle: "Skills that keep the bugs running scared.",
    },
    skills: [
      {
        title: "TypeScript",
        tooltip: "6 years of experience",
      },
      {
        title: "JavaScript",
        tooltip: "11 years of experience",
      },
      {
        title: "ReactJs",
        tooltip: "7 years of experience",
      },
      {
        title: "Redux",
        tooltip: "7 years of experience",
      },
      {
        title: "NextJs",
        tooltip: "7 years of experience",
      },
      {
        title: "PHP",
        tooltip: "5 years of experience",
      },
      {
        title: "NodeJs",
        tooltip: "7 years of experience",
      },
      {
        title: "NestJs",
        tooltip: "7 years of experience",
      },
      {
        title: "React Native",
        tooltip: "3 years of experience",
      },
      {
        title: "SQL",
        tooltip: "7 years of experience",
      },
      {
        title: "PostgreSQL",
        tooltip: "5 years of experience",
      },
      {
        title: "MongoDB",
        tooltip: "4 years of experience",
      },
      {
        title: "MySQL",
        tooltip: "7 years of experience",
      },
      {
        title: "NO-SQL",
        tooltip: "4 years of experience",
      },
      {
        title: "Apollo Federation",
        tooltip: "2 years of experience",
      },
      {
        title: "GraphQL",
        tooltip: "5 years of experience",
      },
      {
        title: "REST",
        tooltip: "8 years of experience",
      },
      {
        title: "GIT",
        tooltip: "8 years of experience",
      },
      {
        title: "Microservice",
        tooltip: "6 years of experience",
      },
      {
        title: "Microfrontend",
        tooltip: "3 years of experience",
      },
      {
        title: "Figma",
        tooltip: "6 years of experience",
      },
      {
        title: "HTML",
        tooltip: "12 years of experience",
      },
      {
        title: "CSS /PostCss/ Scss",
        tooltip: "12 years of experience",
      },
      {
        title: "JQuery",
        tooltip: "6 years of experience",
      },
    ],
  },
  secondarySkills: {
    heading: {
      title: "Secondary Skills",
      subTitle: "Beyond the basics – skills that seal the deal.",
    },
    skills: [
      {
        title: "Java",
        tooltip: "3 years of experience",
      },
      {
        title: "Kafka",
        tooltip: "2 years of experience",
      },
      {
        title: "SpringBoot",
        tooltip: "7 years of experience",
      },
      {
        title: "AWS",
        tooltip: "2 years of experience",
      },
      {
        title: "Vue",
        tooltip: "2 years of experience",
      },
      {
        title: "Nuxt",
        tooltip: "2 years of experience",
      },
      {
        title: "Vuex",
        tooltip: "2 years of experience",
      },
      {
        title: "NestJs",
        tooltip: "7 years of experience",
      },
      {
        title: "CI/CD",
        tooltip: "4 years of experience",
      },
      {
        title: "ELK ( ElasticSearch-Logstash-Kibana )",
        tooltip: "4 years of experience",
      },
      {
        title: "Grafana",
        tooltip: "4 years of experience",
      },
      {
        title: "Docker",
        tooltip: "4 years of experience",
      },
      {
        title: "Jenkins",
        tooltip: "2 years of experience",
      },
      {
        title: "ThreeJs",
        tooltip: "1 years of experience",
      },
      {
        title: "WEB3",
        tooltip: "1 years of experience",
      },
      {
        title: "UI&UX Design",
        tooltip: "6 years of experience",
      },
    ],
  },
  aboutMe: {
    heading: {
      title: "About me",
      subTitle: "The technologies Im most skilled of",
    },
  },
};

export const SNList: SochialNetworkItem[] = [
  {
    link: "https://www.linkedin.com/in/kannifarhad/",
    icon: {
      name: "Linkedin",
      style: { width: "18px" },
      color: "#0077B5",
    },
  },
  {
    link: "https://github.com/kannifarhad",
    icon: {
      name: "Github",
      style: { width: "18px" },
      color: "grey",
      className: "Github",
    },
  },
  {
    link: "https://facebook.com/kannifarhad",
    icon: {
      name: "Facebook",
      style: { width: "18px" },
      color: "#1877F2",
    },
  },
];
