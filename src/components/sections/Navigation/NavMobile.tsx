"use client";
import { useState } from "react";
import BurgerMenuIcon from "./BurgerMenuIcon";
import { StyledMobileNavCont, StyledMobNavWrap } from "./styled";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { routes } from "./constants";

const Navigation = () => {
  const [active, setActive] = useState(false);

  return (
    <MotionConfig
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        // delayChildren: 0.6,
      }}
    >
      <StyledMobileNavCont
        className="flex flex-col"
        initial={false}
        animate={active ? "open" : "closed"}
        variants={VARIANTS.mainmenu}
      >
        <BurgerMenuIcon
          active={active}
          onClick={() => setActive((pv) => !pv)}
        />
        <StyledMobNavWrap
          variants={VARIANTS.navigation}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delayChildren: 1,
          }}
        >
          <ul>
            {routes.map((route, index) => (
              <motion.li
                key={route.title}
                variants={VARIANTS.navigationLinks}
                transition={{ delay: Math.max(index * 1, 1) / 10 + 0.3 }}
              >
                <Link
                  href={route.link}
                  className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300"
                  onClick={() => setTimeout(() => setActive(false), 500)}
                >
                  {route.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </StyledMobNavWrap>
      </StyledMobileNavCont>
    </MotionConfig>
  );
};

const VARIANTS = {
  mainmenu: {
    open: {
      width: "100%",
      height: "100%",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 35,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    closed: {
      width: "60px",
      height: "60px",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  },
  navigation: {
    open: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.4,
      },
    },
    closed: {
      opacity: 0,
    },
  },
  navigationLinks: {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: -20,
    },
  },
};
export default Navigation;
