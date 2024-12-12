import React, { memo } from "react";
import Image, { ImageProps } from "next/image";

export type CustomIconProps = Partial<ImageProps> & {
  src: string;
};

const imageDefaults: Pick<ImageProps, "alt" | "width" | "height"> &
  Pick<CustomIconProps, "color"> = {
  alt: "image title",
  width: 50,
  height: 50,
};

const CustomImage: React.FC<CustomIconProps> = (props) => {
  const icon: ImageProps | undefined = { ...imageDefaults, ...props };
  return (
    <Image
      {...icon}
      src={icon.src}
      alt={icon.alt}
    />
  );
};

export default memo(CustomImage);
