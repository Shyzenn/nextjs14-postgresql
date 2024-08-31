import { deleteEmployee } from "@/lib/action";

const Delete = ({ id }: { id: string }) => {
  const DeleteEmployeetWithId = deleteEmployee.bind(null, id);
  return (
    <form action={DeleteEmployeetWithId}>
      <button className="btn btn-error">Delete</button>
    </form>
  );
};

export default Delete;
