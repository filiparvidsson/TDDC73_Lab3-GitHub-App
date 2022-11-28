import React from "react";

// import the graphql client
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import the http link
import { createHttpLink } from "@apollo/client";

// function to get the apollo client
export function getApolloClient() {
  
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql'
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        };
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

}