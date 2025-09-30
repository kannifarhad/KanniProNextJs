import StoreProvider from "@/store/StoreProvider";
import Footer from "@/components/sections/Footer/Footer";
import { Quicksand, Bebas_Neue } from "next/font/google";
import "normalize.css";
import "@/assets/style.css";
import Header from "@/components/sections/Header";
import StyledComponentsRegistry from "@/app/registry";
import MouseMessages from "@/components/sections/MouseMessages";

const quicksand = Quicksand({ subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Farhad Aliyev | Full Stack Developer & Software Architect",
  name: "Farhad Aliyev",
  info: `Full Stack Developer & Software Architect`,
  description: "Full Stack Developer specializing in JavaScript, TypeScript, React.Js, Node.js, SaaS platforms, and microservices. Crafting scalable, user-focused digital solutions",
  image: "https://kanni.pro/images/portrait.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClassNames = `${bebasNeue.className} ${quicksand.className}`;

  return (
    <html lang="en">
      <body className={fontClassNames}>
        <StoreProvider>
          <StyledComponentsRegistry>
            <div id="myportal" />
            <div className="flex flex-col container xl mx-auto lg:w-full relative max-[900px]:overflow-x-hidden">
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
}
