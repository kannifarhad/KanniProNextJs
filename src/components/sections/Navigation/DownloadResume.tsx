"use client";
import Button from "@/components/ui/Button";

const DownloadResume = () => {
  return (
    <Button
      title="Download Resume"
      variant="text"
      color="green"
      icon={{ name: "Download" }}
      className="DownloadResume"
      handleClick={() => {
        window.open("./FarhadResume.pdf");
      }}
    />
  );
};

export default DownloadResume;
