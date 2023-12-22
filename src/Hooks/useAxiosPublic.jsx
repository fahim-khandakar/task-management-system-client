import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://project-management-server-side.vercel.app/",
});

const userAxiosPublic = () => {
  return axiosPublic;
};

export default userAxiosPublic;
