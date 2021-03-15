import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";

import { DELETE_POST } from "../graphql/mutations";

const useDeletePostMutation = (postID) => {
  const router = useHistory();

  return useMutation(DELETE_POST, {
    variables: {
      postID,
    },
    update(cache, { data }) {
      if (data.deletePost) {
        cache.evict({ id: "Post:" + postID });
      }
    },
    onCompleted() {
      router.push("/feed");
    },
  });
};

export default useDeletePostMutation;
