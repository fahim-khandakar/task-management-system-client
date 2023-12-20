import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="max-w-6xl mx-auto p-5 md:p-0 mt-10">
      <div>
        <div className="flex flex-col items-center  md:flex-row gap-10 mt-10">
          <div className="w-full md:w-1/2">
            {/* <img src={loginPic} alt="" /> */}
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-center">
              Please Login
            </h2>
            <form
              //   onSubmit={handleLogin}
              className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-5"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <p className="text-sm">
                    Do not have an account{" "}
                    <Link className="text-blue-600 font-bold" to="/register">
                      Register
                    </Link>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn font-bold bg-[#ffa500]">Login</button>
              </div>
              <div className=" mt-5">
                {/* <button
                  className="btn btn-ghost font-bold w-full"
                  //   onClick={handleLoginWithGoogle}
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

export default Login;
