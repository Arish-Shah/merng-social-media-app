import { Button } from "react-bootstrap";
import { Fragment, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import Post from "../components/Post";
import { FEED } from "../graphql/queries";

const Feed = () => {
  const [feed, { data, loading, fetchMore }] = useLazyQuery(FEED, {
    variables: {
      limit: 10,
    },
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        skip: data.feed.posts.length,
      },
    });
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
          <Button
            className="btn-block mb-4"
            variant="light"
            onClick={onLoadMore}
          >
            load more
          </Button>
        )}
      </Fragment>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Feed;
