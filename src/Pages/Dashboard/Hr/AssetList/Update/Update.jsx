import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Update = () => {
    const notify = () => toast("Data updated successfully");
    const [startDate, setStartDate] = useState(new Date())
    const asset = useLoaderData();
    const { _id, product, quantity, type } = asset;

    const handleUpdate = async e => {
        e.preventDefault();
        const form = e.target;
        const date = startDate;
        const product = form.productName.value;
        const type = form.type.value;
        const quantity = form.quantity.value;

        const updateDetails = { date, product, type, quantity };

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/assets/${_id}`, updateDetails);
            if (data.modifiedCount) {
                notify();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center">Update an Asset</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleUpdate} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Name"
                                    defaultValue={product}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Quantity</span>
                                </label>
                                <input
                                    type="text"
                                    name="quantity"
                                    placeholder="Product quantity"
                                    defaultValue={quantity}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Type</span>
                                </label>
                                <input
                                    type="text"
                                    name="type"
                                    placeholder="Product type"
                                    defaultValue={type}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Update;
