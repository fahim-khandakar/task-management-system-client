import ArchivedTodo from "../../Hooks/ArchivedTodo";
import LoadingPage from "../Loading Page/LoadingPage";
import ArchivedTaskCard from "./partials/Archived Card/ArchivedCard";

const TodoArchived = () => {
  const { archivedTodo, isLoading } = ArchivedTodo();

  if (isLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 px-20">
        {archivedTodo?.map((todo, index) => (
          <ArchivedTaskCard key={index} task={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoArchived;
