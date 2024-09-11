import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHr from "../../../hooks/useHr";

const AddAnAsset = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [hrData] = useHr();
    const today = new Date();
    const addedDate = today.toISOString().split("T")[0];

    const onSubmit = (data) => {
        const assetInfo = {
            name: data.name,
            email: hrData?.email,
            quantity: parseInt(data.quantity, 10),
            type: data.assetType,
            addedDate: addedDate,
        };

        axiosSecure.post("/assets", assetInfo)
            .then((res) => {
                if (res.data.insertedId) {
                    console.log("Asset added to the database");
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Asset added successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>opti-asset | add asset</title>
            </Helmet>

            <div className="hero min-h-screen bg-blue-100">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Add an Asset</h1>
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
                                <input className="btn btn-primary" type="submit" value="Add Asset" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAnAsset;
