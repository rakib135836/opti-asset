import { useQuery } from "@tanstack/react-query";
import { TiTick } from "react-icons/ti";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHr from "../../../hooks/useHr";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";


const AllRequests = () => {

    const [hrData] = useHr();
    const hrEmail = hrData?.email;
    const axiosSecure = useAxiosSecure();

    const {refetch, data: allrequests = [], isLoading } = useQuery({
        queryKey: ['requested-asset', hrEmail],
        enabled: !!hrEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-asset/${hrEmail}`);
            return res.data;
        }
    })

    const handleApprove =(id)=>{
        
    }
    const handleReject =(id)=>{
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

                axiosSecure.delete(`/requested-asset/${id}`)
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {allrequests?.length > 0 ? (
                <>
                    <h1 className="text-2xl font-bold text-center py-4">All Requests</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* Table head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Requester Name </th>
                                    <th>Requester Email</th>
                                    <th>Request Date</th>
                                    <th>Note</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allrequests.map((request) => (
                                    <tr key={request?._id}>

                                        <td>{request?.asset}</td>
                                        <td>{request?.assetType}</td>
                                        <td>{request?.name}</td>
                                        <td>{request?.email}</td>
                                        <td>{request?.requestedDate}</td>
                                        <td>{request?.note}</td>
                                        <td>{request?.status}</td>

                                        <td>
                                            <div className="flex ">
                                                <div>
                                                    <button onClick={()=>handleApprove(request?._id)} className="btn bg-blue-400"><TiTick /></button>
                                                </div>
                                                <div>
                                                    <button onClick={()=>handleReject(request?._id)} className="btn text bg-red-400"><ImCross /></button>
                                                </div>
                                            </div>
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

export default AllRequests;
