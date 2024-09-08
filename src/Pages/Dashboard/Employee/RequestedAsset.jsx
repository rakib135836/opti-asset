import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";




const RequestedAsset = () => {

    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    const { refetch, data: myrequests = [], isLoading } = useQuery({
        queryKey: ['my-requested-asset', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-requested-asset/${email}`);
            return res.data;
        }
    })


    const handleReturn = async (id) => {
        try {
           
            const res = await axiosSecure.patch(`/my-requested-asset/${id}`);
    
            console.log(res.data)
            if (res.data.modifiedCount ) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'returned successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: 'returned failed.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            // Handle any errors that occur during the request
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            });
            console.error("Error approving request:", error);
        }
    };


    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/requested-asset/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your request has canceled.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    if (isLoading) {
        <span className="loading loading-spinner text-accent"></span>
    }

    return (

        <div>
            {myrequests?.length > 0 ? (
                <>
                    <h1 className="text-2xl font-bold text-center py-4">My Requests</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* Table head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Request Date </th>
                                    <th>Approval Date</th>
                                    <th>Request Status</th>
                                    <th>Action </th>

                                </tr>
                            </thead>
                            <tbody>
                                {myrequests.map((request) => (
                                    <tr key={request?._id}>

                                        <td>{request?.asset}</td>
                                        <td>{request?.assetType}</td>
                                        <td>{request?.requestedDate}</td>
                                        <td>{request?.approvalDate}</td>
                                        <td>{request?.status}</td>


                                        <td>
                                            {request?.status === "pending" ? (
                                                <button
                                                    onClick={() => handleReject(request?._id)}
                                                    className="btn bg-red-400 text-white"
                                                >
                                                    Cancel
                                                </button>
                                            ) : request?.status === "approved" &&
                                                request?.assetType === "Not Returnable" ? (
                                                <button className="btn bg-green-400 text-white">
                                                    Print
                                                </button>
                                            ) : request?.status === "approved" &&
                                                request?.assetType === "Returnable" ? (
                                                <button
                                                onClick={()=>handleReturn(request?._id)}
                                                 className="btn bg-blue-400 text-white"
                                                 disabled={request?.status === "returned"}
                                                >
                                                    Return
                                                </button>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p>No requests found</p>
            )}
        </div>

    );
};

export default RequestedAsset;