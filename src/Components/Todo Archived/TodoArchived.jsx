import ArchivedTodo from "../../Hooks/ArchivedTodo";
import LoadingPage from "../Loading Page/LoadingPage";
import ArchivedTaskCard from "./partials/Archived Card/ArchivedCard";
import noData from "../../assets/no-data.jpg";

const TodoArchived = () => {
  const { archivedTodo, isLoading } = ArchivedTodo();

  if (isLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-3 px-20 w-full">
        {archivedTodo?.length ? (
          archivedTodo?.map((todo, index) => (
            <ArchivedTaskCard key={index} task={todo} />
          ))
        ) : (
          <div className=" col-span-4">
            <img className="w-1/4 mx-auto h-auto" src={noData} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoArchived;
