import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import userAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const CompletedAllTask = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = userAxiosPublic();
  const { data: completedAll = [], refetch: completedRefetch } = useQuery({
    queryKey: ["complete", user],
    enabled: !!user && !loading,

    queryFn: async () => {
      const res = await axiosPublic.get(`/completedTask/${user?.email}`);
      return res.data;
    },
  });
  return { completedAll, completedRefetch };
};

export default CompletedAllTask;
