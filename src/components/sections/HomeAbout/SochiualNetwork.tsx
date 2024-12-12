import { memo } from "react";
import Icon, { IconProps } from "@/components/ui/CustomIcon";
import { StyledSochialList } from "./styled";
import { SNList } from "./constants";

export type SochialNetworkItem = {
  link: string;
  icon: IconProps;
};

const SochialNetwork = () => {
  return (
    <StyledSochialList className="flex items-center justify-start">
      {SNList.map(({ icon, link }) => (
        <a
          key={link}
          className="flex items-center justify-center rounded-full"
          href={link}
          target="_blank"
        >
          <Icon {...icon} />
        </a>
      ))}
    </StyledSochialList>
  );
};

export default memo(SochialNetwork);
