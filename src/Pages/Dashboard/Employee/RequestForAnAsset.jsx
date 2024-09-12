import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAffiliated from "../../../hooks/useAffiliated";

const RequestForAnAsset = () => {

    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const today = new Date();
    const addedDate = today.toISOString().split("T")[0];
    const month = today.getMonth() + 1;
    const { user } = useAuth();
    const name = user?.displayName;
    const email = user?.email;
    const [affiliated] = useAffiliated();
    const hrEmail = affiliated?.hrEmail;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssetName, setSelectedAssetName] = useState();
    const [selectedAssetType, setSelectedAssetType] = useState();

    // New states for search and filter
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAvailability, setFilterAvailability] = useState('');
    const [filterAssetType, setFilterAssetType] = useState('');

    const { data: assets = [] } = useQuery({
        queryKey: ['asset0-for-request '],
        queryFn: async () => {
            const res = await axiosSecure.get(`/for-request/${hrEmail}`);
            return res.data;
        }
    });

    const onSubmit = (data) => {
        const requesterInfo = {
            asset: selectedAssetName,
            note: data.note,
            email: email,
            name: name,
            requestedDate: addedDate,
            approvalDate: '',
            month: month,
            status: 'pending',
            assetType: selectedAssetType,
            hrEmail: hrEmail
        };

        axiosSecure.post('/requested-asset', requesterInfo)
            .then((res) => {
                if (res.data.insertedId) {
                    setIsModalOpen(false);
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request submitted successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Unexpected error occurred.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((err) => {
                console.error("Failed to submit request:", err);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to submit request.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const openModal = (assetName, assetType) => {
        setSelectedAssetName(assetName);
        setSelectedAssetType(assetType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Filtered and searched assets
    const filteredAssets = assets
        .filter((item) => {
            const matchesSearch = item?.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesAvailability = filterAvailability
                ? (filterAvailability === "available" && item?.quantity > 0) ||
                  (filterAvailability === "out-of-stock" && item?.quantity === 0)
                : true;
            const matchesAssetType = filterAssetType
                ? item?.type === filterAssetType
                : true;

            return matchesSearch && matchesAvailability && matchesAssetType;
        });

    return (
        <div>
            <h1 className="text-2xl font-bold text-center py-4">Request for an Asset</h1>

            {/* Search Section */}
            <div className="search-filter-section mb-4">
                <input
                    type="text"
                    placeholder="Search by asset name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            {/* Filter Section */}
            <div className="filter-section mb-4">
                <select
                    value={filterAvailability}
                    onChange={(e) => setFilterAvailability(e.target.value)}
                    className="select select-bordered w-full max-w-xs mr-4"
                >
                    <option value="">Filter by Availability</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>

                <select
                    value={filterAssetType}
                    onChange={(e) => setFilterAssetType(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Filter by Asset Type</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Not Returnable">Not Returnable</option>
                </select>
            </div>

            {/* Assets Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.map((item) => (
                            <tr key={item?._id}>
                                <td>{item?.name}</td>
                                <td>{item?.type}</td>
                                <td>
                                    {item?.quantity > 0 ? (
                                        <span className="text-green-500">Available</span>
                                    ) : (
                                        <span className="text-red-500">Out of Stock</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn text-blue-500"
                                        onClick={() => openModal(item?.name, item?.type)}
                                    >
                                        Request
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Request Asset: {selectedAssetName}</h3>
                        <div className="card flex-shrink-0 w-full max-w-sm bg-blue-100 shadow-2xl">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Additional Note</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("note", { required: true })}
                                        placeholder="Note"
                                        className="input input-bordered"
                                    />
                                    {errors.note && (
                                        <span className="text-red-600">Note is required</span>
                                    )}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Request" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>
                                Close Modal
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default RequestForAnAsset;
