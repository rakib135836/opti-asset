import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { PDFDownloadLink } from '@react-pdf/renderer';
import StatementPdf from "../../../Components/StatementPdf";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const RequestedAsset = () => {
    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [assetType, setAssetType] = useState('');

    const { refetch, data: myrequests = [], isLoading } = useQuery({
        queryKey: ['my-requested-asset', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-requested-asset/${email}`);
            return res.data;
        }
    });

    const handleReturn = async (id) => {
        try {
            const res = await axiosSecure.patch(`/my-requested-asset/${id}`);
            if (res.data.modifiedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Returned successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: 'Return failed.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            });
            console.error("Error returning request:", error);
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
                axiosSecure.delete(`/requested-asset/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your request has been canceled.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    // Filtering Logic: filter the requests based on search, status, and assetType
    const filteredRequests = myrequests.filter((request) => {
        // Check if search matches the asset name (case-insensitive)
        const matchesSearch = request.asset.toLowerCase().includes(search.toLowerCase());

        // Check if status matches (or if no filter is selected, match all statuses)
        const matchesStatus = status ? request.status === status : true;

        // Check if asset type matches (or if no filter is selected, match all types)
        const matchesAssetType = assetType ? request.assetType === assetType : true;

        return matchesSearch && matchesStatus && matchesAssetType;
    });

    if (isLoading) {
        return <span className="loading loading-spinner text-accent"></span>;
    }

    return (
        <div className="p-4">

            <Helmet>
                <title>Employee | Requested Asset</title>
            </Helmet>
            {myrequests?.length > 0 ? (
                <>
                    <div className="mb-4 flex gap-4 flex-col md:flex-row">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search by asset name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}  // Update search state
                            className="input input-bordered w-full md:w-1/3 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Status Filter */}
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            className="select select-bordered w-full md:w-1/3 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                        </select>

                        {/* Asset Type Filter */}
                        <select
                            onChange={(e) => setAssetType(e.target.value)}
                            value={assetType}
                            className="select select-bordered w-full md:w-1/3 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Asset Types</option>
                            <option value="Returnable">Returnable</option>
                            <option value="Not Returnable">Not Returnable</option>
                        </select>
                    </div>

                    <h1 className="text-2xl font-bold text-center py-4">My Requests</h1>
                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-2">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Type</th>
                                    <th className="p-2">Request Date</th>
                                    <th className="p-2">Approval Date</th>
                                    <th className="p-2">Request Status</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Render filtered requests */}
                                {filteredRequests.map((request) => (
                                    <tr key={request?._id} className="hover:bg-gray-50">
                                        <td className="p-2">{request?.asset}</td>
                                        <td className="p-2">{request?.assetType}</td>
                                        <td className="p-2">{request?.requestedDate}</td>
                                        <td className="p-2">{request?.approvalDate}</td>
                                        <td className="p-2">{request?.status}</td>
                                        <td className="p-2">
                                            {request?.status === "pending" ? (
                                                <button
                                                    onClick={() => handleReject(request?._id)}
                                                    className="btn bg-red-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-500"
                                                >
                                                    Cancel
                                                </button>
                                            ) : request?.status === "approved" &&
                                                request?.assetType === "Not Returnable" ? (
                                                <PDFDownloadLink
                                                    document={<StatementPdf request={request} />}
                                                    fileName={`request-statement-${request?._id}.pdf`}
                                                    className="btn bg-green-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500"
                                                >
                                                    {({ loading }) => loading ? "Loading..." : "Print"}
                                                </PDFDownloadLink>
                                            ) : request?.status === "approved" &&
                                                request?.assetType === "Returnable" ? (
                                                <button
                                                    onClick={() => handleReturn(request?._id)}
                                                    className="btn bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500"
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
                <p className="text-center text-lg mt-4">No requests found</p>
            )}
        </div>
    );
};

export default RequestedAsset;
