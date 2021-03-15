import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Form } from "react-bootstrap";

import InputField from "./InputField";
import LoadingButton from "./LoadingButton";
import { CREATE_COMMENT } from "../graphql/mutations";

const CreateComment = ({ postID }) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({
    body: "",
  });

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update(cache, { data }) {
      if (data.createComment.comment) {
        const FRAGMENT = gql`
          fragment _ on Post {
            commentsCount
            comments {
              id
              body
              createdAt
              creator {
                username
              }
            }
          }
        `;

        const cached = cache.readFragment({
          id: "Post:" + postID,
          fragment: FRAGMENT,
        });

        cache.writeFragment({
          id: "Post:" + postID,
          fragment: FRAGMENT,
          data: {
            commentsCount: cached.commentsCount + 1,
            comments: [data.createComment.comment, ...cached.comments],
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
