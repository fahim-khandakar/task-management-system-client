/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { RxCross1 } from "react-icons/rx";
import CompletedAllTask from "../../Hooks/CompletedAllTask";
import AllTask from "../../Hooks/AllTask";
import OngoingAllTask from "../../Hooks/OngoingAllTask";
import noData from "../../assets/no-data.jpg";
import { useDrag, useDrop } from "react-dnd";

const Task = ({ task, openModal, handleDelete }) => {
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
      <td>{task.description}</td>
      <td>{task.user}</td>
      <td>{task.priority}</td>
      <td>
        <button
          onClick={() => openModal(task)}
          className="btn btn-sm btn-warning"
        >
          Edit
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(task._id)}
          className="btn btn-sm btn-warning"
        >
          Delete
        </button>
      </td>
    </tr>
  ) : (
    <tr ref={drag} {...collected} className="hover">
      <th>{task.index}</th>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.user}</td>
      <td>{task.priority}</td>
      <td>
        <button
          onClick={() => openModal(task)}
          className="btn btn-sm btn-warning"
        >
          Edit
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(task._id)}
          className="btn btn-sm btn-warning"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const CompletedTask = () => {
  const { user } = useContext(AuthContext);
  const { ongoingRefetch } = OngoingAllTask();
  const { allTaskRefetch } = AllTask();
  const axiosPublic = userAxiosPublic();
  const { completedRefetch, completedAll } = CompletedAllTask();

  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    if (modalRef.current) {
      modalRef.current.show();
    }
  };

  const { register, handleSubmit, setValue } = useForm();
  const modalRef = useRef(null);

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

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item, monitor) => {
      // Handle the drop action based on the monitor.getItem() data
      // For example, you can move the task to the "To-Do" list:
      console.log("Task dropped to To-Do:", item, monitor);
      const res = axiosPublic.put(`/todoToCompleted/${item.id}`, {
        ...item,
        user: user.email,
      });

      res
        .then((res) => {
          swal("Success!", "Task successfully updated", "success");
          console.log(res.data);
          ongoingRefetch();
          allTaskRefetch();
          completedRefetch();
        })
        .catch((err) => {
          swal("Error!", `${err.message}`, "error");
          console.log(err);
        });
    },
  });

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
      .then((res) => {
        swal("Success!", "Task successfully updated", "success");
        console.log(res.data);
        completedRefetch();
        allTaskRefetch();
        ongoingRefetch();
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.log(err);
      });
  };

  const handleDelete = (taskId) => {
    axiosPublic
      .delete(`/deleteTask/${taskId}`)
      .then((res) => {
        swal("success", `Successfully Deleted`, "success");
        console.log(res);
        completedRefetch();
        allTaskRefetch();
        ongoingRefetch();
      })
      .catch((err) => {
        swal("Error", `${err.message}`, "error");

        console.log(err.message);
      });
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  return (
    <div className="border-2 border-dotted">
      <div ref={drop} className="overflow-x-auto mb-10 md:mb-28">
        {completedAll?.length > 0 ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Email</th>
                <th>Priority</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {completedAll?.map((task, index) => (
                <Task
                  key={task?._id}
                  task={{ ...task, index: index + 1 }}
                  openModal={openModal}
                  handleDelete={handleDelete}
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
    </div>
  );
};

export default CompletedTask;
