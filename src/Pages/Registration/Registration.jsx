import { Link, useLocation, useNavigate } from "react-router-dom";
import sideBanner from "../../assets/undraw_secure_login_pdn4.svg";
import swal from "sweetalert";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    name, photo, email, password;
    if (password.length < 6) {
      return swal(
        "Error!",
        "Password should be at least 6 characters!",
        "error"
      );
    } else if (!/[A-Z]/.test(password)) {
      return swal("Error!", "Password must have a capital letter!", "error");
    } else if (!/[^a-zA-Z0-9\s]/.test(password)) {
      return swal("Error!", "Password must have a special character!", "error");
    }

    createUser(email, password, name, photo)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            navigate(
              location?.state ? location.state : "/dashboard/taskManagement"
            );
          })
          .catch();
        swal("Success!", "Successfully Account Created", "success");
        e.target.reset();
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
        swal("Success!", "Successfully Account Created", "success");
      })
      .catch((error) => {
        swal("Error!", error.message, "error");
      });
  };
  return (
    <div className="max-w-6xl mx-auto p-5 md:p-0 mt-10">
      <div>
        <div className="flex flex-col md:flex-row items-center gap-10   ">
          <div className="w-full md:w-1/2">
            <img src={sideBanner} alt="" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-center">
              Please Register
            </h2>
            <form
              onSubmit={handleRegister}
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

export default Registration;
