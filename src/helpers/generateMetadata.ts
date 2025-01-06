export const metaInfo = {
  name: "Farhad Aliyev",
  info: `Full Stack Developer & Software Architect`,
  description:
    "Full Stack Developer specializing in JavaScript, TypeScript, React.Js, Node.js, SaaS platforms, and microservices. Crafting scalable, user-focused digital solutions",
  image: "https://kanni.pro/images/portrait.png",
};

const defaultMeta = {
  title: `${metaInfo.name} | ${metaInfo.info}`,
  description: metaInfo.description,
  openGraph: {
    title: `${metaInfo.name} | ${metaInfo.info}`,
    description: metaInfo.description,
    images: [
      {
        url: metaInfo.image,
        width: 896,
        height: 1088,
        alt: metaInfo.name,
      },
    ],
  },
};
type GenerateMetadataProps = {
  title: string;
  description: string;
  image?: string;
};

export const generateMetadata = (data?: GenerateMetadataProps) => {
  if (!data) return defaultMeta;
  const title = `${data.title} | ${metaInfo.name}`;

  return {
    title,
    description: data.description,
    openGraph: {
      title,
      description: data.description || metaInfo.description,
      images: [
        {
          url: data.image || metaInfo.image,
          alt: title || metaInfo.name,
        },
      ],
    },
  };
};

export default generateMetadata;
