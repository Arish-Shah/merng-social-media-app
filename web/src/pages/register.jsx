import { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";
import { ME } from "../graphql/queries";
import { REGISTER } from "../graphql/mutations";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const router = useHistory();

  const [register, { loading }] = useMutation(REGISTER, {
    update(cache, { data }) {
      if (data.register.user) {
        cache.writeQuery({
          query: ME,
          data: {
            me: data.register.user,
          },
        });
      }
    },
    onCompleted(data) {
      if (data.register.user) {
        router.push("/feed");
      }
      if (data.register.errors) {
        setErrors({ ...data.register.errors });
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    register({
      variables: {
        input: {
          email,
          username,
          password,
        },
      },
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputField
        type="email"
        label="Email"
        placeholder="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
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
      <LoadingButton loading={loading} text="register" />
    </Form>
  );
};

export default Register;
