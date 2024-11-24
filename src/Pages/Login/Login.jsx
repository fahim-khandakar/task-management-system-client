import { Link, useLocation, useNavigate } from "react-router-dom";
import sideBanner from "../../assets/undraw_secure_login_pdn4.svg";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from "sweetalert";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");
    signIn(email, password)
      .then(() => {
        navigate(
          location?.state ? location.state : "/dashboard/taskManagement"
        );
        swal("Success!", "You Are Successfully Login", "success");
      })
      .catch((error) => {
        swal("Error!", error.message, "error");
      });
  };
  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        navigate(
          location?.state ? location.state : "/dashboard/taskManagement"
        );
        swal("Success!", "You Are Successfully Login", "success");
      })
      .catch((error) => {
        swal("Error!", error.message, "error");
      });
  };
  return (
    <div className=" mx-auto p-5 md:p-0 mt-10">
      <div>
        <div className="flex flex-col items-center  md:flex-row gap-10 mt-10">
          <div className="w-full md:w-1/2">
            <img src={sideBanner} alt="" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-center">
              Please Login
            </h2>
            <form
              onSubmit={handleLogin}
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
                <button
                  className="btn btn-ghost font-bold w-full"
                  onClick={handleLoginWithGoogle}
                >
                  <FcGoogle></FcGoogle> Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
