import { Article, ArticleList } from "@/types/api";
import { ApolloClient, ApolloQueryResult, NormalizedCacheObject, gql } from "@apollo/client";

const GET_BLOG_LIST_QUERY = gql`
  query Articles($pagination: PaginationArg, $articlesSort: [String]) {
    articles(pagination: $pagination, sort: $articlesSort) {
      documentId
      title
      slug
      createdAt
      description
      categories {
        name
        slug
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
        slug
      }
      author {
        name
      }
      relatedarticles {
        slug
        description
        title
        createdAt
      }
    }
  }
`;

const GET_ARTICLES_BY_CATEGORY_SLUG_QUERY = gql`
  query ArticlesByCategorySlug($slug: String!, $pagination: PaginationArg, $articlesSort: [String]) {
    articles(filters: { categories: { slug: { eq: $slug } } }, pagination: $pagination, sort: $articlesSort) {
      documentId
      title
      slug
      createdAt
      description
      categories {
        name
        slug
      }
      cover {
        url
      }
    }
  }
`;

const GET_CATEGORY_INFO_BY_SLUG_QUERY = gql`
  query CategoryBySlug($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
      documentId
      name
      slug
      description
      # cover {
      #   url
      # }
    }
  }
`;
export const getArticleItemByCategorySlug = (client: ApolloClient<NormalizedCacheObject>, slug: string, pagination: PaginationArg): Promise<ApolloQueryResult<{ articles: ArticleList }>> => {
  return client.query({
    query: GET_ARTICLES_BY_CATEGORY_SLUG_QUERY,
    variables: {
      slug,
      pagination,
      articlesSort: "createdAt:desc",
    },
  });
};

export const getCategoryInfoBySlug = (
  client: ApolloClient<NormalizedCacheObject>,
  slug: string
): Promise<
  ApolloQueryResult<{
    categories: Array<{ documentId: string; name: string; slug: string; description?: string }>;
  }>
> => {
  return client.query({
    query: GET_CATEGORY_INFO_BY_SLUG_QUERY,
    variables: {
      slug,
    },
  });
};

interface PaginationArg {
  page: number;
  pageSize: number;
  start?: number;
  limit?: number;
}

export const getArticleList = (client: ApolloClient<NormalizedCacheObject>, pagination: PaginationArg): Promise<ApolloQueryResult<{ articles: ArticleList }>> => {
  return client.query({
    query: GET_BLOG_LIST_QUERY,
    variables: {
      pagination,
      articlesSort: "createdAt:desc",
    },
  });
};

export const getArticleItemBySlug = (client: ApolloClient<NormalizedCacheObject>, slug: string): Promise<ApolloQueryResult<{ articleBySlug: Article }>> => {
  return client.query({
    query: GET_BLOG_ITEM_BY_SLUG_QUERY,
    variables: {
      slug,
    },
  });
};
