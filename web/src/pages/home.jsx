import { useQuery } from "@apollo/client";

import { POSTS_QUERY } from "../graphql";

const Home = () => {
  const { data } = useQuery(POSTS_QUERY);

  console.log(data);

  return (
    <main>
      <h1>Home</h1>
    </main>
  );
};

export default Home;
