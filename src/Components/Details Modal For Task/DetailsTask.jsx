/* eslint-disable react/prop-types */
import Modal from "../Modal/Modal";

const DetailsTask = ({ isOpen, setIsOpen, task, handleFunc, funcBtnValue }) => {
  return (
    <Modal
      header="Task Details"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      bgColor="bg-gray-200"
    >
      <div className="p-4 bg-zinc-100  rounded-lg  space-y-4">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div className="col-span-1 font-medium text-gray-600">Title</div>
          <div className="col-span-1 text-gray-800">{task?.title || "N/A"}</div>

          <div className="col-span-1 font-medium text-gray-600">
            Description
          </div>
          <div className="col-span-1 text-gray-800">
            {task?.description || "N/A"}
          </div>

          <div className="col-span-1 font-medium text-gray-600">
            Created Date
          </div>
          <div className="col-span-1 text-gray-800">
            {task?.createdAt?.slice(0, 10) || "N/A"}
          </div>
          <div className="col-span-1 font-medium text-gray-600">Deadline</div>
          <div className="col-span-1 text-gray-800">
            {task?.deadline || "N/A"}
          </div>

          <div className="col-span-1 font-medium text-gray-600">Priority</div>
          <div
            className={`col-span-1 text-white text-center px-2 py-1 rounded-full ${
              task?.priority === "High"
                ? "bg-red-500"
                : task?.priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {task?.priority || "N/A"}
          </div>

          <div className="col-span-1 font-medium text-gray-600">Status</div>
          <div
            className={`col-span-1 text-white text-center px-2 py-1 rounded-full ${
              task?.status === "todo"
                ? "bg-blue-500"
                : task?.status === "in-progress"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {task?.status || "N/A"}
          </div>
          {handleFunc && (
            <div>
              <button
                className="btn btn-xs bg-sky-600 text-white"
                onClick={() => handleFunc(task?._id)}
              >
                {funcBtnValue}
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DetailsTask;
