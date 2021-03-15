import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Comment from "../components/Comment";
import CreateComment from "../components/CreateComment";
import { POST } from "../graphql/queries";
import { formatDate } from "../util/format-date";

const Post = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(POST, {
    variables: {
      id,
    },
  });

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
        <p>{data.post.body}</p>
        <div className="my-5">
          {<h6 className="m-0">{data.post.comments.length} comments</h6>}
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
