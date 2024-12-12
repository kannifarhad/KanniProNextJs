"use client";
import { memo } from "react";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { StyledBlogListCarousel } from "./styled";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "@/helpers/emblaHelpers";
import { blogList } from "./constants";
import BlogItem from "@/components/sections/BlogListItem";

const BlogList = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <StyledBlogListCarousel className="flex">
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {blogList.map((blog) => (
              <div className="embla__slide" key={blog.id}>
                <BlogItem {...blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </StyledBlogListCarousel>
  );
};

export default memo(BlogList);
