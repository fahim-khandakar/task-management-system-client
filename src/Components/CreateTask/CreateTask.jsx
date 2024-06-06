import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import swal from "sweetalert";
import { AuthContext } from "../../Providers/AuthProvider";
import { RxCross1 } from "react-icons/rx";
import AllTask from "../../Hooks/AllTask";
import OngoingAllTask from "../../Hooks/OngoingAllTask";

const CreateTask = () => {
  const { user } = useContext(AuthContext);
  const { ongoingRefetch } = OngoingAllTask();
  const { allTaskRefetch } = AllTask();
  const axiosPublic = userAxiosPublic();
  const { register, handleSubmit, setValue } = useForm();
  const modalRef = useRef(null);

  useEffect(() => {
    // Set initial values for the form
    setValue("title", "");
    setValue("description", "");
    setValue("deadline", "");
    setValue("priority", "Low");
    setValue("status", "todo");
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Submitted:", { ...data, user: user.email });
    if (modalRef.current) {
      modalRef.current.close();
    }

    const res = axiosPublic.post("/addTask", { ...data, user: user.email });
    res
      .then((res) => {
        swal("Success!", "You Are Successfully Added this task", "success");
        console.log(res.data);
        allTaskRefetch();
        ongoingRefetch();
        setValue("title", "");
        setValue("description", "");
        setValue("deadline", "");
        setValue("priority", "Low");
        setValue("status", "todo");
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.log(err);
      });
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="btn btn-warning btn-sm"
      >
        Create New Task
      </button>

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
              className="flex flex-col gap-4 w-full max-w-lg mt-8 mx-auto  p-6 "
              method="dialog"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Title:
                  <input
                    required
                    placeholder="Title"
                    className="input input-bordered w-full mt-1"
                    {...register("title")}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Description:
                  <textarea
                    required
                    placeholder="Description"
                    className="input input-bordered w-full mt-1 h-24"
                    {...register("description")}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Deadline:
                  <input
                    required
                    placeholder="Deadline"
                    className="input input-bordered w-full mt-1"
                    type="date"
                    {...register("deadline")}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Priority:
                  <select
                    required
                    className="input input-bordered w-full mt-1"
                    {...register("priority")}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
              </div>

              <button className="btn btn-warning mt-4" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateTask;
