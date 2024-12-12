import DownloadResume from "./DownloadResume";
import NavMobile from "@/components/sections/Navigation/NavMobile";
import {
  StyledHeaderRight,
  StyledHeaderLeft,
  StyledHeaderNavigation,
} from "./styled";
import ThemeModeSwitch from "./ThemeModeSwitch";
import Link from "next/link";

const Navigation = () => {
  return (
    <>
      <div className="nav-wrapper flex flex-row">
        <StyledHeaderLeft className="flex flex-row items-center">
          <div className="logo">KANNIFARHAD</div>
          <StyledHeaderNavigation>
            <ul className="menu md:flex flex-row space-x-6">
              <li>
                <Link
                  href="/"
                  className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </StyledHeaderNavigation>
          <div style={{ marginLeft: "auto" }}>
            <ThemeModeSwitch />
          </div>
        </StyledHeaderLeft>
        <StyledHeaderRight className=" flex items-center justify-center">
          <DownloadResume />
        </StyledHeaderRight>
      </div>
      <div className="nav-mobile">
        <NavMobile />
      </div>
    </>
  );
};

export default Navigation;
