/* eslint-disable react/prop-types */
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types";
import userAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useRef } from "react";
import ArchivedTodo from "../../../../Hooks/ArchivedTodo";

const ArchivedTaskCard = ({ task }) => {
  const axiosPublic = userAxiosPublic();
  const {
    title,
    description,
    deadline,
    priority,
    status,
    user,
    _id,
    createdAt,
  } = task;
  const { archivedTodoRefetch } = ArchivedTodo();

  const modalRef = useRef(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title,
      description,
      deadline: new Date(deadline).toISOString().split("T")[0],
      priority,
    },
  });

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.show();
    }
  };

  const closeModal = () => {
    if (modalRef?.current) {
      modalRef.current.close();
    }
  };

  const onSubmit = (data) => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    axiosPublic
      .put(`/updateTask/${_id}`, {
        ...data,
        user,
      })
      .then(() => {
        swal("Success!", "Task successfully updated", "success");
        archivedTodoRefetch();
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.error(err);
      });
  };

  const handleDelete = () => {
    axiosPublic
      .delete(`/deleteTask/${_id}`)
      .then(() => {
        swal("Success!", "Task successfully deleted", "success");
        archivedTodoRefetch();
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.error(err);
      });
  };

  const priorityColors = {
    High: "text-red-500 bg-red-50 border border-red-500",
    Medium: "text-yellow-500 bg-yellow-50 border border-yellow-500",
    Low: "text-green-500 bg-green-50 border border-green-500",
  };

  return (
    <div>
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg border border-gray-300 max-w-sm hover:shadow-2xl transition-all duration-500 transform">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-700">{title}</h3>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${priorityColors[priority]}`}
          >
            {priority}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <div className="text-sm text-gray-500 mb-6">
          <div className="flex items-center mb-2">
            <span>
              Created Date: {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <span>User: {user}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="px-5 py-2 text-sm font-medium text-white bg-gray-700 rounded-full shadow-md">
            {status.toUpperCase()}
          </span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={openModal}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-end items-start">
            <button onClick={closeModal}>
              <RxCross1 />
            </button>
          </div>
          <div className="modal-action flex flex-col">
            <h1 className="text-center font-bold text-xl">Edit Task</h1>
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

ArchivedTaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArchivedTaskCard;
