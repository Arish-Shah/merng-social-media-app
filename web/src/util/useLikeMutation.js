import { gql, useMutation } from "@apollo/client";

import { LIKE } from "../graphql/mutations";

const useLikeMutation = (postID, isLiked) => {
  return useMutation(LIKE, {
    variables: {
      postID,
    },
    update(cache, { data }) {
      if (data.like) {
        const FRAGMENT = gql`
          fragment __ on Post {
            likesCount
            isLiked
          }
        `;

        const cached = cache.readFragment({
          id: "Post:" + postID,
          fragment: FRAGMENT,
        });

        cache.writeFragment({
          id: "Post:" + postID,
          fragment: FRAGMENT,
          data: {
            likesCount: cached.likesCount + (isLiked ? -1 : 1),
            isLiked: !isLiked,
          },
        });
      }
    },
  });
};

export default useLikeMutation;
