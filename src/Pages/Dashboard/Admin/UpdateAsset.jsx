import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHr from "../../../hooks/useHr";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

const UpdateAsset = () => {
    const { name, quantity, type, _id } = useLoaderData();
    console.log(name)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const [hrData] = useHr();
    const today = new Date();
    const addedDate = today.toISOString().split("T")[0];

    // Set default values using setValue
    useEffect(() => {
        setValue("name", name);
        setValue("quantity", quantity);
        setValue("assetType", type);
    }, [name, quantity, type, setValue]);

    const onSubmit = async (data) => {
        const asset = {
            name: data.name,
            quantity: data.quantity,
            type: data.assetType,
        };

        try {
            const assetRes = await axiosSecure.patch(`/assets/${_id}`, asset);
            if (assetRes.data.modifiedCount > 0) {
                // show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error updating asset:", error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>hr | Update Asset</title>
            </Helmet>

            <div className="hero min-h-screen bg-blue-100">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Update Asset- <span className="text-blue-500 ">{name}</span></h1>
                        <img className="rounded-md" src="https://i.ibb.co/fkVMJ3T/undraw-Sign-up-n6im.png" alt="" />
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Asset Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Asset Quantity</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("quantity", { required: true })}
                                    placeholder="Quantity"
                                    className="input input-bordered"
                                />
                                {errors.quantity && <span className="text-red-600">Quantity is required</span>}
                            </div>

                            <div className="form-control">
                                <label htmlFor="assetType" className="label">
                                    <span className="label-text">Asset Type</span>
                                </label>
                                <select
                                    id="assetType"
                                    {...register("assetType", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select an Asset Type</option>
                                    <option value="Returnable">Returnable</option>
                                    <option value="Not Returnable">Not Returnable</option>
                                </select>
                                {errors.assetType && <span className="text-red-600">Asset Type is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Added Date</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={addedDate}
                                    readOnly
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder={hrData?.email}
                                    readOnly
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Update Asset" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAsset;
