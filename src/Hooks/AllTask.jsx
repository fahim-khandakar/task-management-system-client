import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import userAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllTask = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = userAxiosPublic();
  const {
    data: tasks = [],
    isLoading,
    refetch: allTaskRefetch,
  } = useQuery({
    queryKey: ["task", user],
    enabled: !!user && !loading,

    queryFn: async () => {
      const res = await axiosPublic.get(`/task/${user?.email}`);
      return res.data;
    },
  });
  return { tasks, isLoading, allTaskRefetch };
};

export default AllTask;
