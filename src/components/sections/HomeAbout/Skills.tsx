import RoundBlock from "@/components/ui/RoundBlock";
import Tag from "@/components/ui/Tag";
import { memo } from "react";
import { blocksInfo } from "./constants";
import { Chip } from "@/components/ui/Chip";
import CustomImage from "@/components/ui/CustomImage";
import SochiualNetwork from "./SochiualNetwork";

const HomeAbout = () => {
  return (
    <>
      <div className="flex gap-2 w-full	max-[640px]:flex-col">
        <RoundBlock
          heading={blocksInfo.primarySkills.heading}
          className="primary-skills top-block"
        >
          <div
            className="gap-2 inline-flex flex-wrap justify-end"
            style={{ marginTop: "auto" }}
          >
            {blocksInfo.primarySkills.skills?.map((tag, index) => (
              <Tag key={tag.title + index} {...tag} />
            ))}
          </div>
        </RoundBlock>

        <RoundBlock
          heading={blocksInfo.secondarySkills.heading}
          className="secondary-skills top-block"
        >
          <div className="gap-2 inline-flex flex-wrap">
            {blocksInfo.secondarySkills.skills?.map((tag, index) => (
              <Tag key={tag.title + index} {...tag} />
            ))}
          </div>
        </RoundBlock>
      </div>

      <div className="grid gap-2 w-full grid-cols-8 ">
        <RoundBlock
          heading={{
            title: "I speak in",
            subTitle: "Debugging in multiple languages — literally!",
          }}
          className="language-skills col-span-6 bg-transparent max-[640px]:col-span-8"
        >
          <div
            className="gap-2 inline-flex flex-wrap justify-end max-[640px]:justify-start"
            style={{ marginTop: "auto" }}
          >
            <Chip
              title="Fluent"
              icon={<CustomImage src="/images/flags/en.svg" />}
            />
            <Chip
              title="Native"
              icon={<CustomImage src="/images/flags/az.svg" />}
            />
            <Chip
              title="Fluent"
              icon={<CustomImage src="/images/flags/ru.svg" />}
            />
            <Chip
              title="Fluent"
              icon={
                <CustomImage
                  src="/images/flags/tr.svg"
                  style={{ left: "65%" }}
                />
              }
            />
            <Chip
              title="Elementary"
              icon={<CustomImage src="/images/flags/de.svg" />}
            />
          </div>
        </RoundBlock>

        <RoundBlock
          heading={{ title: "Let’s Connect", "subTitle": "Find me and say hello!" }}
          className=" sochialBlock col-span-2 max-[640px]:col-span-8"
        >
          <SochiualNetwork />
        </RoundBlock>
      </div>
    </>
  );
};

export default memo(HomeAbout);
