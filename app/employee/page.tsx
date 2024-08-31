import Link from "next/link";
import { getEmployeeList } from "@/lib/action";
import { formatDate } from "@/lib/utils";
import Delete from "@/components/Delete";

const EmployeePage = async () => {
  const employees = await getEmployeeList();

  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-2xl font-semibold">Employee</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="mb-2 w-full text-right">
          <Link href={"/employee/create"} className="btn btn-primary">
            Create
          </Link>
        </div>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr className="bg-white border-b" key={employee.id}>
                <td className="px-3 py-6">{index + 1}</td>
                <td className="px-3 py-6">{employee.name}</td>
                <td className="px-3 py-6">{employee.email}</td>
                <td className="px-3 py-6">{employee.phone}</td>
                <td className="px-3 py-6">
                  {formatDate(employee.createdAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <Link
                    href={`/employee/edit/${employee.id}`}
                    className="btn btn-info"
                  >
                    Edit
                  </Link>
                  <Delete id={employee.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePage;
