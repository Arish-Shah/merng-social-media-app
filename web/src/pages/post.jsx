import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Star, StarFill } from "react-bootstrap-icons";

import Comment from "../components/Comment";
import CreateComment from "../components/CreateComment";
import { POST } from "../graphql/queries";
import { formatDate } from "../util/format-date";
import { Button } from "react-bootstrap";
import useLikeMutation from "../util/useLikeMutation";

const Post = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const { data, loading } = useQuery(POST, {
    variables: {
      id,
    },
    onCompleted(data) {
      setLiked(data.post.isLiked);
    },
  });

  const [like] = useLikeMutation(id, liked);

  const onLike = async () => {
    await like();
    setLiked((liked) => !liked);
  };

  if (!loading && !data?.post) {
    return <h3 className="text-center">Post Not Found</h3>;
  } else if (!loading && data.post) {
    return (
      <Fragment>
        <h1>{data.post.title}</h1>
        <h6 className="text-muted mb-3">
          @{data.post.creator.username} &middot;{" "}
          {formatDate(data.post.createdAt)}
        </h6>
        <Button
          size="sm"
          className="mb-2 d-flex align-items-center"
          variant="light"
          onClick={onLike}
        >
          {liked ? <StarFill fill="#ffdd42" /> : <Star />}{" "}
          <span className="ml-2">
            {data.post.likesCount}{" "}
            {data.post.likesCount === 1 ? "like" : "likes"}
          </span>
        </Button>
        <p>{data.post.body}</p>
        <div className="my-5" id="comments">
          <h6 className="m-0">
            {data.post.comments.length}{" "}
            {data.post.comments.length === 1 ? "comment" : "comments"}
          </h6>
          <CreateComment postID={data.post.id} />
          {data.post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </Fragment>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default Post;
