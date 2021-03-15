import { formatDate } from "../util/format-date";

const Comment = ({ comment }) => {
  return (
    <div className="mb-3">
      <div>{comment.body}</div>
      <small className="text-muted">
        @{comment.creator.username} &middot; {formatDate(comment.createdAt)}
      </small>
    </div>
  );
};

export default Comment;
