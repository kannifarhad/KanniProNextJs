export type ArticleListItem = {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  description: string;
  categories: Array<{ name: string, slug: string }>;
  cover: {
    url: string;
  };
};
export type ArticleList = ArticleListItem[];

export type Article = ArticleListItem & {
  fullstory: string;
  relatedarticles: Array<{
    title: string;
    slug: string;
    createdAt: string;
    description: string;
  }>;
};
