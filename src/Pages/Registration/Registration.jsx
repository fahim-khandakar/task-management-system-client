import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="max-w-6xl mx-auto p-5 md:p-0 mt-10">
      <div>
        <div className="flex flex-col md:flex-row items-center gap-10   ">
          {/* <div className="w-full md:w-1/2">{View}</div> */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-center">
              Please Register
            </h2>
            <form
              //   onSubmit={handleRegister}
              className="w-full md:w-3/4 lg:w-1/2  mx-auto"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL (Optional)"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <p className="text-sm">
                    Already have an account{" "}
                    <Link className="text-blue-600 font-bold" to="/login">
                      Login
                    </Link>
                  </p>
                </label>
              </div>
              <div className="form-control mt-1">
                <button className="btn bg-[#ffa500] font-bold">Register</button>
              </div>
              <div className=" mt-2">
                {/* <button
                  className="btn btn-ghost font-bold w-full"
                  onClick={handleLoginWithGoogle}
                >
                  <FcGoogle></FcGoogle> Google
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
