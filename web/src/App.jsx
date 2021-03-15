import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Col, Container, Row } from "react-bootstrap";

import Register from "./pages/register";
import Login from "./pages/login";
import Feed from "./pages/feed";
import CreatePost from "./pages/create-post";
import Post from "./pages/post";
import EditPost from "./pages/edit-post";

import Topbar from "./components/Topbar";

const App = () => {
  const routes = (
    <Switch>
      <Route path="/feed" component={Feed} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/create-post" component={CreatePost} exact />
      <Route path="/post/:id" component={Post} exact />
      <Route path="/post/edit/:id" component={EditPost} exact />
      <Redirect to="/feed" />
    </Switch>
  );

  return (
    <Fragment>
      <Topbar />
      <Container className="mt-4">
        <Row>
          <Col lg="6" className="mx-auto">
            {routes}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default App;
