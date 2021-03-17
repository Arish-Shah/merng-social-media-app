import { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import useAuth from "../util/useAuth";
import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";
import { ME } from "../graphql/queries";
import { LOGIN } from "../graphql/mutations";

const Login = () => {
  useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const router = useHistory();

  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, { data }) {
      if (data.login.user) {
        cache.writeQuery({
          query: ME,
          data: {
            me: data.login.user,
          },
        });
        cache.evict({ fieldName: "feed" });
      }
    },
    onCompleted(data) {
      if (data.login.errors) {
        setErrors({ ...data.login.errors });
      }
      if (data.login.user) {
        router.push("/feed");
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputField
        type="text"
        label="Username"
        placeholder="username"
        value={username}
        onChange={setUsername}
        error={errors.username}
        autoFocus={true}
      />
      <InputField
        type="password"
        label="Password"
        placeholder="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <LoadingButton loading={loading} text="login" />
    </Form>
  );
};

export default Login;
