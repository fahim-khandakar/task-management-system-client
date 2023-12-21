import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import userAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const OngoingAllTask = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = userAxiosPublic();
  const { data: ongoings = [], refetch: ongoingRefetch } = useQuery({
    queryKey: ["ongoing", user],
    enabled: !!user && !loading,

    queryFn: async () => {
      const res = await axiosPublic.get(`/ongoingTask/${user?.email}`);
      return res.data;
    },
  });
  return { ongoings, ongoingRefetch };
};

export default OngoingAllTask;
