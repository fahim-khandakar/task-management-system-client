import { useContext } from "react";
import profile from "../../assets/user.png";
import { AuthContext } from "../../Providers/AuthProvider";

const Profile = () => {
  const { user, name, photo } = useContext(AuthContext);
  return (
    <div>
      {user && (
        <div className="flex  text-[#482551]  gap-3 md:gap-5 items-center">
          <div className=" text-xs md:text-base text-center">
            {user.displayName ? user.displayName : name}
          </div>
          <div>
            {user.photoURL ? (
              <img
                className="w-[25px] md:w-[30px] rounded-full"
                src={user.photoURL}
                alt="user"
              />
            ) : photo ? (
              <img
                className="w-[20px] md:w-[30px] rounded-full"
                src={photo}
                alt="user"
              />
            ) : (
              <img
                className="w-[20px] md:w-[30px] rounded-full"
                src={profile}
                alt="user"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
