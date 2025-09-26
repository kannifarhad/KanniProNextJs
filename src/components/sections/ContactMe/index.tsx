import { memo } from "react";
import Lamps from "./Lamps";
import ContactButtons from "./ContactButtons";
// import Icon from "@/components/ui/CustomIcon";
import { StyledContactMe } from "./styled";
import MaskedText from "@/components/ui/AnimatiedBlocks/MaskedText";

const ContactMe = () => {
  return (
    <>
      <StyledContactMe className="contact-me" id="contact" data-section-id="contact-me">
        <div className="contact-info flex alignt-center flex-col items-center gap-10">
          {/* <Icon
            name="Handshake"
            style={{
              width: "200",
              height: "200",
            }}
            className="connect-image"
          /> */}
          <h2 className="text-7xl head" style={{ marginTop: "230px" }}>
            <MaskedText text="Tell me about your next project" />
          </h2>
        </div>
        <Lamps />
        <ContactButtons />
      </StyledContactMe>
    </>
  );
};

export default memo(ContactMe);
