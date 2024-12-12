import { LangOptionsEnum } from "@/types/common";
import axiosClient from "./axiosClient";
import { AxiosResponse } from "axios";

interface getArticleProps {
  lang: LangOptionsEnum;
  slug: string;
}
interface Article {
  id: string;
  title: string;
  slug: string;
  categorylist: string[];
  shortstory: string;
  fullstory: string;
  view: string;
  tags: string[];
  thumb_image: string;
  extras: null | string;
  date: string;
  authorphoto: null | string;
  authorname: null | string;
  author: null | string;
}

export const getArticle = ({
  lang,
  slug,
}: getArticleProps): Promise<AxiosResponse<Article>> =>
  axiosClient.post("/posts/getpostbyslug", { lang, slug });
