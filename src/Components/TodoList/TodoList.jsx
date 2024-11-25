/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { RxCross1 } from "react-icons/rx";
import { useDrag, useDrop } from "react-dnd";
import AllTask from "../../Hooks/AllTask";
import OngoingAllTask from "../../Hooks/OngoingAllTask";
import CompletedAllTask from "../../Hooks/CompletedAllTask";
import noData from "../../assets/no-data.jpg";
import { icons } from "../../Shared/Icons/Icons";
import DetailsTask from "../Details Modal For Task/DetailsTask";

const Task = ({ task, openModal, handleDelete, handleDetailsModal }) => {
  const [collected, drag, dragPreview] = useDrag({
    type: "TASK",
    item: {
      id: task._id,
      title: task.title,
      description: task.description,
      priority: task.priority,
    },
  });

  return collected.isDragging ? (
    <tr ref={dragPreview} className="hover">
      <th>{task.index}</th>
      <td>{task.title}</td>
      <td>{task.description?.slice(0, 10)}</td>
      <td
        className={`px-2 py-1 rounded-full text-white ${
          task.priority === "High"
            ? "bg-red-500"
            : task.priority === "Medium"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      >
        {task.priority}
      </td>
      <td>
        <button
          onClick={() => openModal(task)}
          className="btn btn-xs btn-warning"
        >
          {icons?.edit}
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(task._id)}
          className="btn btn-xs btn-warning"
        >
          {icons?.delete}
        </button>
      </td>
    </tr>
  ) : (
    <tr ref={drag} {...collected} className="hover cursor-pointer">
      <th>{task.index}</th>
      <td onClick={() => handleDetailsModal(task)}>{task.title}</td>
      <td>{task.description?.slice(0, 10)}</td>
      <td>
        <span
          className={`py-1 px-2 rounded-full text-white ${
            task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {task.priority}
        </span>
      </td>
      <td>
        <button onClick={() => openModal(task)} className="btn btn-xs">
          {icons?.edit}
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(task._id)}
          className="btn btn-xs text-red-500 text-lg"
        >
          {icons?.delete}
        </button>
      </td>
    </tr>
  );
};

const TodoList = () => {
  const { allTaskRefetch, tasks } = AllTask();
  const { ongoingRefetch } = OngoingAllTask();
  const { completedRefetch } = CompletedAllTask();

  const { user } = useContext(AuthContext);
  const axiosPublic = userAxiosPublic();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      // Handle the drop action based on the monitor.getItem() data
      // For example, you can move the task to the "To-Do" list:
      const res = axiosPublic.put(`/toTodo/${item.id}`, {
        ...item,
        user: user.email,
      });

      res
        .then(() => {
          swal("Success!", "Task successfully updated", "success");
          ongoingRefetch();
          allTaskRefetch();
          completedRefetch();
        })
        .catch((err) => {
          swal("Error!", `${err.message}`, "error");
        });
    },
  });

  const openModal = (task) => {
    setSelectedTask(task);
    if (modalRef.current) {
      modalRef.current.show();
    }
  };

  const handleDetailsModal = (task) => {
    setIsOpen(true);
    setSelectedTask(task);
  };

  const { register, handleSubmit, setValue } = useForm();
  const modalRef = useRef(null);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  useEffect(() => {
    // Ensure modalRef is initialized properly
    if (modalRef.current === null) {
      modalRef.current = new window.dialogPolyfillHTMLDivElement();
      document.body.appendChild(modalRef.current);
    }
  }, []);

  useEffect(() => {
    if (selectedTask) {
      // Populate the form with the selected task data
      setValue("title", selectedTask.title);
      setValue("description", selectedTask.description);
      setValue("deadline", selectedTask.deadline);
      setValue("priority", selectedTask.priority);
    }
  }, [selectedTask, setValue]);

  const onSubmit = (data) => {
    if (modalRef.current) {
      modalRef.current.close();
    }

    // Update the task using the selectedTask._id
    const res = axiosPublic.put(`/updateTask/${selectedTask._id}`, {
      ...data,
      user: user.email,
    });

    res
      .then(() => {
        swal("Success!", "Task successfully updated", "success");
        allTaskRefetch();
        ongoingRefetch();
        completedRefetch();
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
      });
  };

  const handleDelete = (taskId) => {
    axiosPublic
      .delete(`/deleteTask/${taskId}`)
      .then(() => {
        swal("success", `Successfully Deleted`, "success");
        allTaskRefetch();
        ongoingRefetch();
        completedRefetch();
      })
      .catch((err) => {
        swal("Error", `${err.message}`, "error");
      });
  };

  return (
    <div className="bg-white shadow-lg">
      <h1 className="text-center font-bold text-2xl md:text-4xl py-5 border-b">
        Pending
      </h1>

      <div ref={drop} className="overflow-x-auto h-[calc(100vh-50vh)]">
        {tasks?.length > 0 ? (
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {/* Render Task components */}
              {tasks?.map((task, index) => (
                <Task
                  key={task?._id}
                  task={{ ...task, index: index + 1 }}
                  openModal={openModal}
                  handleDelete={handleDelete}
                  handleDetailsModal={handleDetailsModal}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center">
            <img src={noData} alt="" />
          </div>
        )}
      </div>
      <dialog
        id="my_modal_5"
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex justify-end items-start">
            <button onClick={closeModal}>
              <RxCross1 />
            </button>
          </div>
          <div className="modal-action flex flex-col">
            <h1 className="text-center font-bold text-xl">Add A Task</h1>

            <form
              className="flex flex-col gap-2 w-full mt-5 mx-auto"
              method="dialog"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>
                Title:
                <input
                  className="input input-bordered w-full max-w-xs ml-5"
                  {...register("title")}
                />
              </label>

              <label className="grid grid-cols-[auto,1fr] gap-2 items-center">
                <span>Description:</span>
                <textarea
                  className="input input-bordered py-[10px] w-full max-w-xs"
                  {...register("description")}
                />
              </label>

              <label>
                Deadline:
                <input
                  className="input input-bordered w-full max-w-xs ml-5"
                  type="date"
                  {...register("deadline")}
                />
              </label>

              <label>
                Priority:
                <select
                  className="input input-bordered w-full max-w-xs ml-5"
                  {...register("priority")}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>

              <button className="btn btn-warning mt-5" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <DetailsTask isOpen={isOpen} setIsOpen={setIsOpen} task={selectedTask} />
    </div>
  );
};

export default TodoList;
