import { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";
import { CREATE_POST } from "../graphql/mutations";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useHistory();

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(cache) {
      cache.evict({ fieldName: "feed" });
    },
    onCompleted(data) {
      if (data.createPost.post) {
        router.push("/feed");
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createPost({
      variables: {
        input: {
          title,
          body,
        },
      },
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputField
        type="text"
        label="Title"
        placeholder="title"
        value={title}
        onChange={setTitle}
      />
      <InputField
        isTextArea={true}
        type="text"
        label="Body"
        placeholder="body"
        value={body}
        onChange={setBody}
        rows="8"
      />
      <LoadingButton loading={loading} text="create" />
    </Form>
  );
};

export default CreatePost;
