import { Article, ArticleList } from "@/types/api";
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";

const GET_BLOG_LIST_QUERY = gql`
  query Articles($pagination: PaginationArg) {
    articles(pagination: $pagination) {
      documentId
      title
      slug
      createdAt
      description
      categories {
        name
      }
      cover {
        url
      }
    }
  }
`;

const GET_BLOG_ITEM_BY_SLUG_QUERY = gql`
  query ArticleBySlug($slug: String!) {
    articleBySlug(slug: $slug) {
      documentId
      title
      slug
      createdAt
      description
      cover {
        url
      }
      fullstory
      categories {
        name
      }
      author {
        name
      }
      relatedarticles {
          slug
          description
          title,
          createdAt
      }
    }
  }
`;

interface PaginationArg {
  page: number;
  pageSize: number;
  start?: number;
  limit?: number;
}

export const getArticleList = (
  client: ApolloClient<NormalizedCacheObject>,
  pagination: PaginationArg
): Promise<ApolloQueryResult<{ articles: ArticleList }>> => {
  return client.query({
    query: GET_BLOG_LIST_QUERY,
    variables: {
      pagination,
    },
    fetchPolicy: "network-only",
  });
};

export const getArticleItemBySlug = (
  client: ApolloClient<NormalizedCacheObject>,
  slug: string
): Promise<ApolloQueryResult<{ articleBySlug: Article }>> => {
  return client.query({
    query: GET_BLOG_ITEM_BY_SLUG_QUERY,
    variables: {
      slug,
    },
  });
};
