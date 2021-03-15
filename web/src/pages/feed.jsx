import { Fragment, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import Post from "../components/Post";
import LoadingButton from "../components/LoadingButton";
import { FEED } from "../graphql/queries";

const Feed = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [feed, { data, loading, fetchMore }] = useLazyQuery(FEED, {
    variables: {
      limit: 3,
    },
  });

  const onLoadMore = () => {
    setLoadingMore(true);
    fetchMore({
      variables: {
        skip: data.feed.posts.length,
      },
    }).then(() => setLoadingMore(false));
  };

  useEffect(() => {
    feed();
  }, [feed]);

  if (!loading && data) {
    return (
      <Fragment>
        {data.feed.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {data.feed.hasMore && (
          <LoadingButton
            text="load more"
            loadingText="loading..."
            loading={loadingMore}
            variant="light"
            className="mb-4"
            onClick={onLoadMore}
            block
          />
        )}
      </Fragment>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Feed;
