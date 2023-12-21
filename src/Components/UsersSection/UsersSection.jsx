const UsersSection = () => {
  return (
    <div className="mt-5 md:mt-10 mb-10 md:mb20">
      <h1 className="text-center text-3xl md:text-4xl font-bold">
        --- Who can use this website ---
      </h1>

      <div className="flex justify-between flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 mt-10">
          <h1 className="font-bold text-xl md:text-2xl ">
            How to get benefits from using this website
          </h1>
          <p className="mt-5">
            Welcome to [Your Task Management Website Name], where productivity
            meets simplicity. Our innovative task management platform is
            meticulously crafted to elevate your efficiency and transform the
            way you approach your daily tasks. With intuitive features,
            collaborative workspaces, and powerful analytics, our platform
            empowers individuals and teams to effortlessly organize, prioritize,
            and conquer their to-do lists. Experience the next level of
            productivity with [Your Task Management Website Name] – where
            managing tasks becomes a seamless and enjoyable part of your daily
            routine.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Developers</h2>
                <p>
                  Boost developer productivity with streamlined task management.
                  Stay organized, collaborate seamlessly, and enhance coding
                  efficiency—all in one platform.
                </p>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Bankers</h2>
                <p>
                  Optimize Banking Operations with Efficient Task Management.
                  Streamline tasks, enhance collaboration, and achieve
                  operational excellence for bankers with our platform.
                </p>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">corporate professionals</h2>
                <p>
                  Elevate Corporate Efficiency: Maximize productivity, foster
                  collaboration, and streamline tasks seamlessly for corporate
                  professionals.
                </p>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Students</h2>
                <p>
                  Enhance Student Productivity: Streamline tasks, manage
                  assignments, and stay organized with our user-friendly task
                  management platform for students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersSection;
