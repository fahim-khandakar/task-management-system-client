import { RiMenu2Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="drawer ">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle p-5 cursor-pointer"
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className=" drawer-button ">
          <RiMenu2Fill className="text-2xl" />
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side mt-[64px]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <NavLink to="/dashboard/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/taskManagement">Task Management</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/archivedTodo">Archived</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
