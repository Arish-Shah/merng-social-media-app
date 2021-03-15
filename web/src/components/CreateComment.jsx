import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Form } from "react-bootstrap";

import InputField from "./InputField";
import LoadingButton from "./LoadingButton";
import { CREATE_COMMENT } from "../graphql/mutations";
import { POST } from "../graphql/queries";

const CreateComment = ({ postID }) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({
    body: "",
  });

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update(cache, { data }) {
      if (data.createComment.comment) {
        const cachedPost = cache.readQuery({
          query: POST,
          variables: {
            id: postID,
          },
        });

        cache.writeQuery({
          query: POST,
          variables: {
            id: postID,
          },
          data: {
            post: {
              ...cachedPost,
              comments: [
                data.createComment.comment,
                ...cachedPost.post.comments,
              ],
            },
          },
        });
      }
    },
    onCompleted(data) {
      setBody("");

      if (data.createComment.errors) {
        setErrors({
          body: data.createComment.errors.body || "",
        });
      }
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    createComment({
      variables: {
        body,
        postID,
      },
    });
  };

  return (
    <Form className="mb-4" onSubmit={onSubmit}>
      <InputField
        placeholder="join the converstion"
        type="text"
        value={body}
        onChange={setBody}
        error={errors.body}
      />
      <LoadingButton loading={loading} text="comment" />
    </Form>
  );
};

export default CreateComment;
