import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import userAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ArchivedTodo = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = userAxiosPublic();
  const {
    data: archivedTodo = [],
    isLoading,
    refetch: archivedTodoRefetch,
  } = useQuery({
    queryKey: ["task", user],
    enabled: !!user && !loading,

    queryFn: async () => {
      const res = await axiosPublic.get(`/archivedTodo/${user?.email}`);
      return res.data;
    },
  });
  return { archivedTodo, isLoading, archivedTodoRefetch };
};

export default ArchivedTodo;
