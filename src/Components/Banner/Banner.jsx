import { Link } from "react-router-dom";
import banner from "../../assets/task-management-hero-banner.png";

const Banner = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-0">
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={banner} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
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
