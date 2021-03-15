import { useMutation } from "@apollo/client";
import { useState } from "react";

import { LIKE } from "../graphql/mutations";
import { POST_FRAGMENT } from "../graphql/fragments";

const useLikeMutation = (postID, isLiked) => {
  const [liked, setLiked] = useState(isLiked);

  const [like] = useMutation(LIKE, {
    variables: {
      postID,
    },
    update(cache, { data }) {
      if (data.like) {
        const cached = cache.readFragment({
          id: "Post:" + postID,
          fragment: POST_FRAGMENT,
        });

        cache.writeFragment({
          id: "Post:" + postID,
          fragment: POST_FRAGMENT,
          data: {
            likesCount: cached.likesCount + (isLiked ? -1 : 1),
            isLiked: !isLiked,
          },
        });
      }
    },
  });

  const doLike = async () => {
    await like();
    setLiked((liked) => !liked);
  };

  return [doLike, liked, setLiked];
};

export default useLikeMutation;
