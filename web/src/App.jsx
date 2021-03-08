import { Route, Switch } from "react-router";
import { Container } from "semantic-ui-react";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import MenuBar from "./components/MenuBar";

const App = () => {
  const routes = (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
    </Switch>
  );

  return (
    <main>
      <MenuBar />
      <Container>{routes}</Container>
    </main>
  );
};

export default App;
