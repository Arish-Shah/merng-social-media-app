import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { formatDate } from "../util/formatDate";
import PostActions from "./PostActions";

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
        <PostActions for={post} small={true} />
        <div>
          <small className="text-muted">
            {post.createdAt !== post.updatedAt
              ? "edited " + formatDate(post.updatedAt)
              : "posted " + formatDate(post.createdAt)}
          </small>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;
