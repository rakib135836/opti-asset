import Swal from "sweetalert2";
import useHr from "../../../hooks/useHr";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const MyEmployeeList = () => {

    const [hrData, refetch] = useHr();
    const employees = hrData?.employees;
    const axiosSecure = useAxiosSecure();


    const handleRemove = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/hrs/remove-employee/${hrData?.email}/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (

        <div>

            <Helmet>
                <title>Hr|  employees</title>
            </Helmet>

            <h1 className="text-2xl font-bold text-center py-4">My Employees</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            employees.map((employee) =>
                                <tr key={employee?._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={employee?.photo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{employee?.name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {employee?.email}

                                    </td>

                                    <th>
                                        <button onClick={() => handleRemove(employee?._id)} className="btn btn-ghost btn-xs">remove</button>
                                    </th>
                                </tr>
                            )
                        }



                    </tbody>


                </table>
            </div>




        </div>

    );
};

export default MyEmployeeList;