import { Fragment, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Comment from "../components/Comment";
import CreateComment from "../components/CreateComment";
import PostActions from "../components/PostActions";
import { POST, ME } from "../graphql/queries";
import { formatDate } from "../util/formatDate";

const Post = () => {
  const { id } = useParams();
  const { data: meData } = useQuery(ME);
  const { data, loading } = useQuery(POST, {
    variables: {
      id,
    },
  });

  const location = useLocation();
  const commentsRef = useRef();

  useEffect(() => {
    if (location.hash.includes("comments") && commentsRef.current) {
      commentsRef.current.scrollIntoView();
    }
  }, [location.hash, data]);

  if (!loading && !data?.post) {
    return <h3 className="text-center mt-5">Post Not Found</h3>;
  } else if (!loading && data.post) {
    return (
      <Fragment>
        <h1 className="mb-3">{data.post.title}</h1>
        <h6 className="text-muted mb-3">
          @{data.post.creator.username} &middot;{" "}
          {data.post.createdAt !== data.post.updatedAt
            ? "edited " + formatDate(data.post.updatedAt)
            : "posted " + formatDate(data.post.createdAt)}
        </h6>
        <PostActions for={data.post} className="mb-3" />
        <p className="mb-4">{data.post.body}</p>
        <hr />
        <div className="my-4" id="comments" ref={commentsRef}>
          <h6 className="m-0">
            {data.post.comments.length}{" "}
            {data.post.comments.length === 1 ? "comment" : "comments"}
          </h6>
          {meData?.me && <CreateComment postID={data.post.id} />}
          {!meData?.me && <div className="mb-4"></div>}
          {data.post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} postID={data.post.id} />
          ))}
        </div>
      </Fragment>
    );
  } else {
    return <div className="text-center">loading...</div>;
  }
};

export default Post;
