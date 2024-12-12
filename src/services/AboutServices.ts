import { LangOptionsEnum } from "@/types/common";
import { getArticle } from "./ArticlesService";

export const getAboutMeInfo = () =>
  getArticle({ lang: LangOptionsEnum.EN, slug: "farhad-aliyev_53" });
