import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Button, Card } from "react-bootstrap";
import { ChatLeftText, Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import useLikeMutation from "../util/useLikeMutation";
import useDeletePostMutation from "../util/useDeletePostMutation";
import DeleteModal from "./DeleteModal";
import { formatDate } from "../util/formatDate";
import { ME } from "../graphql/queries";
import PostActions from "./PostActions";

const Post = ({ post }) => {
  const { data } = useQuery(ME);
  const [like, liked] = useLikeMutation(post.id, post.isLiked);
  const [deletePost, { loading }] = useDeletePostMutation(post.id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const buttonStyles = { position: "relative", zIndex: 2 };

  return (
    <Card className="mb-4">
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          @{post.creator.username}
        </Card.Subtitle>
        <Card.Text>{post.snippet}</Card.Text>
        <Link to={`/post/${post.id}`} className="stretched-link"></Link>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <div className="d-flex">
          <PostActions for={post} snippetView={true} />
          {/* <Button
            size="sm"
            className="d-flex align-items-center"
            variant="light"
            style={buttonStyles}
            onClick={like}
          >
            {liked ? <StarFill fill="#ffdd42" /> : <Star />}{" "}
            <span className="ml-2">{post.likesCount}</span>
          </Button>
          <Button
            className="ml-2 d-flex align-items-center"
            size="sm"
            variant="light"
          >
            <ChatLeftText /> <span className="ml-2">{post.commentsCount} </span>
          </Button>
          {data?.me?.username === post.creator.username && (
            <Button
              className="ml-2 text-danger"
              size="sm"
              variant="light"
              style={buttonStyles}
              onClick={() => setShowDeleteModal(true)}
            >
              delete
            </Button>
          )} */}
        </div>
        <div>
          <small className="text-muted">{formatDate(post.createdAt)}</small>
        </div>
        <DeleteModal
          title="Are you sure you want to delete this Post?"
          body="This action cannot be undone"
          show={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={deletePost}
          loading={loading}
        />
      </Card.Footer>
    </Card>
  );
};

export default Post;
