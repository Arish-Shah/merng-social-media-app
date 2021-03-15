import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";

import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: false,
          merge(existing = {}, incoming) {
            return {
              posts: [...(existing.posts || []), ...incoming.posts],
              hasMore: incoming.hasMore,
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
