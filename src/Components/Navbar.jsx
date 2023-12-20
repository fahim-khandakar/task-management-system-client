import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>

      {
        <details className="dropdown">
          <summary
            style={{
              cursor: "pointer",
              outline: "none",
              listStyleType: "none",
            }}
          >
            Dashboard
          </summary>
          <ul className=" menu-sm dropdown-content text-left text-[#482551] mt-1 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
            <li>
              <NavLink to="myServices">My Services</NavLink>
            </li>
            <li>
              <NavLink to="addServices">Add Services</NavLink>
            </li>
            <li>
              <NavLink to="mySchedules">My Schedules</NavLink>
            </li>
          </ul>
        </details>
      }
    </>
  );
  return (
    <div className="shadow-md w-full ">
      <div className="navbar font-serif text-[#482551] mx-auto max-w-6xl px-5 md:px-0 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className=" lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="flex flex-col  menu-sm dropdown-content text-black mt-1 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <div className="w-3/4 md:w-1/2">
            <h1>Task Management System</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="gap-10 menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end gap-2 md:gap-5">
          {/* {user ? (
            <details>
              <summary
                style={{
                  cursor: "pointer",
                  outline: "none",
                  listStyleType: "none",
                }}
              >
                <Profile></Profile>
              </summary>
              <ul className="p-2 absolute shadow menu dropdown-content z-[1] bg-white text-black rounded-box w-32 md:w-40">
                <li className="list-none mx-auto rounded-md  text-xs md:text-base md:btn-ghost">
                  <button onClick={signOut}>Sign Out</button>
                </li>
              </ul>
            </details>
          ) : (
            <li className="list-none md:btn md:btn-ghost text-[#482551]  text-xs md:text-base">
              <NavLink to="/login">Login</NavLink>
            </li>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
