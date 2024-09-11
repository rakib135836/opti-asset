import { Helmet } from "react-helmet-async";
import useHr from "../../../hooks/useHr";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
    const [hrData,refetch] = useHr();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure=useAxiosSecure();


    const onSubmit = (data) => {
        const updatedName = data.name;

       axiosSecure.patch(`/profile-update/${hrData?._id}`, { name: updatedName })
            .then((res) => {
               
                if (res.data.modifiedCount) {
                    
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
                    refetch();
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
           
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (

        <div className="flex items-center justify-center min-h-screen">
            <Helmet>
                <title>Hr | profile</title>
            </Helmet>
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-fill object-center w-full h-56"
                    src={hrData?.photo || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
                    alt="avatar"
                />



                <div className="px-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{hrData?.name || "Patterson Johnson"}</h1>

                    <p className="py-2 text-gray-700 dark:text-gray-400">
                        Manager at {hrData?.companyName}
                    </p>

                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg
                            aria-label="suitcase icon"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M14 11H10V13H14V11Z" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                            />
                        </svg>

                        <h1 className="px-2 text-sm">{hrData?.companyName || "Meraki UI"}</h1>
                    </div>



                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg
                            aria-label="email icon"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            />
                        </svg>

                        <h1 className="px-2 text-sm">{hrData?.email || "patterson@example.com"}</h1>

                    </div>
                    <button onClick={() => openModal(hrData?._id)} className="btn bg-blue-400 w-full py-2"> update </button>

                    {isModalOpen && (
                        <dialog open className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">update profile <span className="text-blue-300">{hrData?.name}</span> </h3>
                                <div className="card flex-shrink-0 w-full max-w-sm bg-blue-100 shadow-2xl ">
                                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                {...register("name", { required: true })}
                                                placeholder="name"
                                                className="input input-bordered"
                                            />
                                            {errors.name && (
                                                <span className="text-red-600">name is required</span>
                                            )}
                                        </div>
                                        <div className="form-control mt-6">
                                            <input className="btn btn-primary" type="submit" value="Update" />
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
            </div>
        </div>
    );
};

export default Profile;
