import React from "react";
import ReactDOM from "react-dom";
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "semantic-ui-css/semantic.min.css";

const link = createHttpLink({
  uri: "http://localhost:4000/",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
