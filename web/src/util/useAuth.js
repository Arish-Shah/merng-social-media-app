import { useQuery } from "@apollo/client";
import { useHistory } from "react-router";

import { ME } from "../graphql/queries";

const useAuth = () => {
  const { data, loading } = useQuery(ME);

  const router = useHistory();

  if (!loading) {
    if (data?.me) {
      router.replace("/feed");
    }
  }
};

export default useAuth;
