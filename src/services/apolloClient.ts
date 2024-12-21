import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_BASE_URL } from "@/constants/common";

const createApolloClient = () => {
  const uri = `${API_BASE_URL}/graphql`;
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
