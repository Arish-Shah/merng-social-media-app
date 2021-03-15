import { Fragment, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

import DeleteModal from "./DeleteModal";
import { formatDate } from "../util/formatDate";
import { ME } from "../graphql/queries";
import { DELETE_COMMENT } from "../graphql/mutations";
import { COMMENTS_COUNT_FRAGMENT } from "../graphql/fragments";

const Comment = ({ comment, postID }) => {
  const { data } = useQuery(ME);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    update(cache, { data }) {
      if (data.deleteComment) {
        cache.evict({ id: "Comment:" + comment.id });

        const cached = cache.readFragment({
          id: "Post:" + postID,
          fragment: COMMENTS_COUNT_FRAGMENT,
        });

        cache.writeFragment({
          id: "Post:" + postID,
          fragment: COMMENTS_COUNT_FRAGMENT,
          data: {
            commentsCount: cached.commentsCount - 1,
          },
        });
      }
    },
    onCompleted() {
      setShowDeleteModal(false);
    },
  });

  const onDeleteComment = () => {
    deleteComment({
      variables: {
        commentID: comment.id,
      },
    });
  };

  return (
    <Fragment>
      <div className="mb-3">
        <div>{comment.body}</div>
        <small className="text-muted">
          @{comment.creator.username} &middot; {formatDate(comment.createdAt)}
          {data?.me?.username === comment.creator.username && (
            <Fragment>
              {" "}
              &middot;{" "}
              <Button
                size="sm"
                variant="light"
                className="text-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            </Fragment>
          )}
        </small>
      </div>
      <DeleteModal
        title="Are you sure you want to delete this comment?"
        body="This action cannot be undone"
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onDelete={onDeleteComment}
        loading={loading}
      />
    </Fragment>
  );
};

export default Comment;
