import { useQuery } from "@apollo/client";
import { Button, Dropdown } from "react-bootstrap";
import { ChatLeftText, Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import useLikeMutation from "../util/useLikeMutation";
import { ME } from "../graphql/queries";
import { Fragment, useState } from "react";
import DeleteModal from "./DeleteModal";
import useDeletePostMutation from "../util/useDeletePostMutation";

const buttonStyles = { position: "relative", zIndex: 2 };

const PostActions = ({ for: post, small = false, className }) => {
  const { data } = useQuery(ME);

  return (
    <div className={`d-flex ${className || ""}`}>
      <LikeButton post={post} small={small} />
      <CommentsButton
        postID={post.id}
        count={post.commentsCount}
        small={small}
      />
      {post.creator.username === data?.me?.username && (
        <CreatorActions post={post} small={small} />
      )}
    </div>
  );
};

const LikeButton = ({ post }) => {
  const [like, liked] = useLikeMutation(post.id, post.isLiked);
  return (
    <Button
      size="sm"
      style={buttonStyles}
      variant="light"
      className="d-flex align-items-center"
      onClick={like}
    >
      {liked ? <StarFill fill="#ffdd42" /> : <Star />}{" "}
      <span className="ml-2">{post.likesCount}</span>
    </Button>
  );
};

const CommentsButton = ({ count, small, postID }) => {
  return (
    <Button
      size="sm"
      style={buttonStyles}
      variant="light"
      className="ml-2"
      as={Link}
      to={`/post/${postID}#comments`}
    >
      <ChatLeftText />
      <span className="ml-2">
        {count} {!small && (count === 1 ? "comment" : "comments")}
      </span>
    </Button>
  );
};

const CreatorActions = ({ post }) => {
  const [deletePost, { loading }] = useDeletePostMutation(post.id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <Fragment>
      <Dropdown style={buttonStyles}>
        <Dropdown.Toggle variant="light" className="ml-2" size="sm">
          More
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/post/edit/${post.id}`}>
            Edit Post
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteModal
        title="Are you sure you want to delete this Post?"
        body="This action cannot be undone"
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onDelete={deletePost}
        loading={loading}
      />
    </Fragment>
  );
};

export default PostActions;
