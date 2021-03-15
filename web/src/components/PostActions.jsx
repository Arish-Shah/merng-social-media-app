import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

import { ME } from "../graphql/queries";

const PostActions = ({ for: post, snippetView = false, className }) => {
  const { data } = useQuery(ME);

  return (
    <div className={`d-flex ${className}`}>
      <LikeButton />
    </div>
  );
};

const LikeButton = () => <Button size="sm"></Button>;

const CommentButton = () => {};

const EditButton = () => {};

const DeleteButton = () => {};

export default PostActions;
