import { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";
import { ME } from "../graphql/queries";
import { LOGIN } from "../graphql/mutations";

const Login = () => {
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
      }
    },
    onCompleted(data) {
      if (data.login.user) {
        router.push("/feed");
      }
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await login({
      variables: {
        username,
        password,
      },
    });
    if (response?.data?.login?.errors) {
      setErrors({ ...response.data.login.errors });
    }
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
