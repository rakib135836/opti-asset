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
    const month = today.getMonth() + 1
    const { user } = useAuth();
    const name = user?.displayName;
    const email = user?.email;
    const [affiliated]=useAffiliated();
    const hrEmail=affiliated?.hrEmail;

    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssetName, setSelectedAssetName] = useState();
    const [selectedAssetType, setSelectedAssetType] = useState();



    const { data: assets = [] } = useQuery({
        queryKey: ['asset0-for-request '],
        queryFn: async () => {
            const res = await axiosSecure.get(`/for-request/${hrEmail}`);
            return res.data;
        }
    });

    const onSubmit = (data) => {
        const requesterInfo = {
            asset:selectedAssetName,
            note: data.note,
            email: email,
            name: name,
            requestedDate: addedDate,
            approvalDate:'',
            month:month,
            status:'pending',
            assetType: selectedAssetType,
            hrEmail:hrEmail

        };
    
        axiosSecure.post('/requested-asset', requesterInfo)
            .then((res) => {
                // Assuming that the API returns a success message or status
                if (res.data.insertedId) {
                    // Close the modal immediately
                    setIsModalOpen(false);
                    reset();
    
                    // Display success notification
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request submitted successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    // Handle case where no message or incorrect status
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
    
                // Display error notification
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to submit request.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };
    

    const openModal = ( assetName, assetType) => {
        setSelectedAssetName(assetName);
        setSelectedAssetType(assetType);  
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);  
    };



    return (
        <div>

            <h1 className="text-2xl font-bold text-center py-4">Request for an Asset</h1>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Type</th>
                            <th>Availability</th>
                            <th>Action </th>


                        </tr>
                    </thead>
                    <tbody>

                        {
                            assets.map((item) =>
                                <tr key={item?._id}>

                                    <td>
                                        {item?.name}
                                    </td>
                                    <td>
                                        {item?.type}

                                    </td>
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
                                            onClick={() => openModal( item?.name,item?.type)}
                                        >
                                            Request
                                        </button>
                                    </td>



                                </tr>
                            )
                        }



                    </tbody>


                </table>
            </div>

            {isModalOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Request Asset: {selectedAssetName}</h3>
                        <div className="card flex-shrink-0 w-full max-w-sm bg-blue-100 shadow-2xl ">
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