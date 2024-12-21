import StoreProvider from "@/store/StoreProvider";
import { FC, PropsWithChildren } from "react";
import Footer from "@/components/sections/Footer/Footer";
import { Quicksand, Bebas_Neue } from "next/font/google";
import "normalize.css";
import "@/assets/style.css";
import Header from "@/components/sections/Header";
import StyledComponentsRegistry from "@/app/registry";
import MouseMessages from "@/components/sections/MouseMessages";

const QuicksandFont = Quicksand({ subsets: ["latin"] });
const BebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${BebasNeue.className} ${QuicksandFont.className} `}>
        <StoreProvider>
          <StyledComponentsRegistry>
            <div id="myportal" />
            <div className="flex flex-col container xl mx-auto lg:w-full">
              <Header />
              {children}
              <MouseMessages />
              <Footer />
            </div>
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
