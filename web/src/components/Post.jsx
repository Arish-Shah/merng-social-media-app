import { Card } from "react-bootstrap";
import { ChatLeftText, Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { formatDate } from "../util/format-date";

const Post = ({ post }) => {
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
          <small className="text-muted d-flex align-items-center">
            {post.isLiked ? (
              <StarFill fill="#ffce42" />
            ) : (
              <Star fill="currentColor" />
            )}
            <span className="ml-1">{post.likesCount}</span>
          </small>
          <small className="text-muted ml-3 d-flex align-items-center">
            <ChatLeftText />
            <span className="ml-1">{post.commentsCount}</span>
          </small>
        </div>
        <div>
          <small className="text-muted">{formatDate(post.createdAt)}</small>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;
