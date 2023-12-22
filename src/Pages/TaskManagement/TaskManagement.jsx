import CompletedTask from "../../Components/Completed/CompletedTask";
import CreateTask from "../../Components/CreateTask/CreateTask";
import Ongoing from "../../Components/Ongoing/Ongoing";
import TodoList from "../../Components/TodoList/TodoList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import swal from "sweetalert";

const TaskManagement = () => {
  const axiosPublic = userAxiosPublic();
  const { user, loading } = useContext(AuthContext);
  const { data: taskForWarning = [] } = useQuery({
    queryKey: ["taskForWarning", user],
    enabled: !!user && !loading,

    queryFn: async () => {
      const res = await axiosPublic.get(`/taskForWarning/${user?.email}`);
      return res.data;
    },
  });

  const date = new Date();
  const todayTasks = taskForWarning.filter((task) => {
    // Assuming task.deadline is a string representation of a date
    const taskDate = new Date(task.deadline);
    return !isNaN(taskDate) && taskDate.toDateString() === date.toDateString();
  });

  if (todayTasks.length > 0) {
    swal(
      "Remember!",
      `Today's tasks:\n${todayTasks
        .map((task, index) => `${index + 1}. ${task.title}\n`)
        .join("")}`,
      "success"
    );
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="flex justify-end -mt-6">
          <div className="flex justify-end w-1/2">
            <CreateTask></CreateTask>
          </div>
        </div>
        <h1 className="text-center font-bold text-2xl md:text-4xl my-5">
          --- Todo List ---
        </h1>
        <TodoList></TodoList>
        <h1 className="text-center text-2xl md:text-4xl font-bold my-5">
          --- Ongoing ---
        </h1>
        <Ongoing></Ongoing>
        <h1 className="text-center text-2xl md:text-4xl font-bold my-5">
          --- Completed ---
        </h1>
        <CompletedTask></CompletedTask>
      </DndProvider>
    </div>
  );
};

export default TaskManagement;
