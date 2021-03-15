import { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";
import { EDIT_POST } from "../graphql/mutations";
import { ME, POST } from "../graphql/queries";
import { UPDATE_POST_FRAGMENT } from "../graphql/fragments";

const EditPost = () => {
  const { id } = useParams();

  const { data: meData } = useQuery(ME);
  const { data, loading: postLoading } = useQuery(POST, {
    variables: {
      id,
    },
    onCompleted(data) {
      if (data.post) {
        setTitle(data.post.title);
        setBody(data.post.body);
      }
    },
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useHistory();

  const [editPost, { loading }] = useMutation(EDIT_POST, {
    update(cache, { data }) {
      if (data.editPost) {
        cache.writeFragment({
          id: "Post:" + id,
          fragment: UPDATE_POST_FRAGMENT,
          data: {
            title,
            body,
            snippet: body.substring(0, 67),
          },
        });
        router.push("/");
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    editPost({
      variables: {
        postID: id,
        input: { title, body },
      },
    });
  };

  if (!postLoading && data?.post?.creator?.username !== meData?.me.username) {
    return <h3 className="text-center mt-5">Post not Found</h3>;
  } else if (!postLoading && data?.post) {
    return (
      <Form onSubmit={onSubmit}>
        <InputField
          type="text"
          label="Title"
          placeholder="title"
          value={title}
          onChange={setTitle}
          autoFocus={true}
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
        <LoadingButton loading={loading} text="update" />
      </Form>
    );
  }

  return <div className="text-center">loading...</div>;
};

export default EditPost;
