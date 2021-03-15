import { Fragment } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";
import { LOGOUT } from "../graphql/mutations";

const Topbar = () => {
  const { data, loading } = useQuery(ME);

  const [logout] = useMutation(LOGOUT, {
    update(cache) {
      cache.writeQuery({
        query: ME,
        data: {
          me: null,
        },
      });
      cache.evict({ fieldName: "feed" });
    },
  });

  const onLogout = () => {
    logout();
  };

  const links = data?.me ? (
    <Dropdown>
      <Dropdown.Toggle>@{data.me.username}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/create-post">
          create post
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <Fragment>
      <Nav.Link as={NavLink} to="/login">
        login
      </Nav.Link>
      <Nav.Link as={NavLink} to="/register">
        register
      </Nav.Link>
    </Fragment>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <span className="font-weight-bold">merng</span>
        </Navbar.Brand>
        {!loading && <Nav>{links}</Nav>}
      </Container>
    </Navbar>
  );
};

export default Topbar;
