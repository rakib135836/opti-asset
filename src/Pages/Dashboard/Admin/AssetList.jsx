import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAsset from "../../../hooks/useAsset";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHr from "../../../hooks/useHr";
import { Link } from "react-router-dom";


const AssetList = () => {
    const [asset, refetch] = useAsset();
    const axiosSecure = useAxiosSecure();
    const [hrData] = useHr();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/assets/${id}`)
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
            <h1 className="text-center text-3xl font-bold mb-3">Asset List of {hrData?.name}</h1>
            <h1 className="text-center text-sm font-bold mb-3">available asset ({asset?.length})</h1>

            <div className="overflow-x-auto">
                <table className="table  w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date </th>
                            <th>actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            asset.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    {item?.name}
                                </td>
                                <td>
                                    {item?.type}
                                </td>
                                <td>
                                    ${item?.quantity}

                                </td>
                                <td>
                                    {item?.addedDate}
                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>

                                    <Link to={`/dashboard/updateAsset/${item._id}`}>
                                        <button
                                            className="btn  bg-blue-500">
                                            <FaEdit className="text-white 
                                        "></FaEdit>
                                        </button>
                                    </Link>
                                </th>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;