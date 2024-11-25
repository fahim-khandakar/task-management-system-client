import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://project-management-server-side.vercel.app/",
  // baseURL: "http://localhost:5000/",
});

const userAxiosPublic = () => {
  return axiosPublic;
};

export default userAxiosPublic;
