import { Button, Card } from "react-bootstrap";
import { ChatLeftText, Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import useLikeMutation from "../util/useLikeMutation";
import { formatDate } from "../util/format-date";
import { useState } from "react";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [like] = useLikeMutation(post.id, post.isLiked);

  const onLike = async () => {
    await like();
    setLiked((liked) => !liked);
  };

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
          <Button
            size="sm"
            className="d-flex align-items-center"
            variant="light"
            style={{ position: "relative", zIndex: 2 }}
            onClick={onLike}
          >
            {liked ? <StarFill fill="#ffdd42" /> : <Star />}{" "}
            <span className="ml-2">
              {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
            </span>
          </Button>
          <Button
            className="ml-2 d-flex align-items-center"
            size="sm"
            variant="light"
          >
            <ChatLeftText />{" "}
            <span className="ml-2">
              {post.commentsCount}{" "}
              {post.commentsCount === 1 ? "comment" : "comments"}
            </span>
          </Button>
        </div>
        <div>
          <small className="text-muted">{formatDate(post.createdAt)}</small>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;
