export type ArticleListItem = {
  documentId: string,
  title: string,
  slug: string,
  createdAt: string,
  description: string,
  categories: Array<{name :string}>,
  cover: {
    url: string
  } 
}
export type ArticleList = ArticleListItem[];

export type Article = ArticleListItem & {
  fullstory: string,
}