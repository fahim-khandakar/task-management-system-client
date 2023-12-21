import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="card w-1/2 bg-base-100 shadow-xl">
        <figure>
          <img className="h-60" src={user.photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl">{user.displayName}</h2>
          <p className="text-center font-bold">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
