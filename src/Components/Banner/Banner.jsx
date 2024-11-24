import { Link } from "react-router-dom";
import banner from "../../assets/task-management-hero-banner.png";

const Banner = () => {
  return (
    <div className="mx-auto  px-5 md:px-0">
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={banner} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">
              Effortless Task Mastery: Your Ultimate Task Management Solution
            </h1>
            <p className="py-6">
              Empower your productivity with our intuitive task management
              website. Seamlessly organize, prioritize, and conquer your tasks
              with ease. Experience a new level of efficiency and control as you
              streamline your workflow. Your tasks, your way — all in one place.
            </p>
            <Link to="/login">
              <button className="btn btn-warning">Let’s Explore</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
