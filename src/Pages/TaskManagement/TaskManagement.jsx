import CompletedTask from "../../Components/Completed/CompletedTask";
import CreateTask from "../../Components/CreateTask/CreateTask";
import Ongoing from "../../Components/Ongoing/Ongoing";
import TodoList from "../../Components/TodoList/TodoList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const TaskManagement = () => {
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
