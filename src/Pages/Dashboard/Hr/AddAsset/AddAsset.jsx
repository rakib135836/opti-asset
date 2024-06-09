import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAsset = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [productType, setProductType] = useState("returnable");

    const notify = () => toast("asset added  successfully");

    const handleAddAsset = async (e) => {
        e.preventDefault();
        const form = e.target;
        const product = form.productName.value;
        const quantity = form.quantity.value;

        const addedDetails = {
            date: startDate,
            product,
            quantity,
            type: productType,
        };
        console.log(addedDetails);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/asset`, addedDetails);
            if (data.insertedId) {
                notify()
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred');
        }
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center">Add an Asset</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleAddAsset} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Name"
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
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Type</span>
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="returnable"
                                            checked={productType === "returnable"}
                                            onChange={() => setProductType("returnable")}
                                            className="radio"
                                            required
                                        />
                                        <span>Returnable</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="non-returnable"
                                            checked={productType === "non-returnable"}
                                            onChange={() => setProductType("non-returnable")}
                                            className="radio"
                                            required
                                        />
                                        <span>Non-returnable</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Add
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

export default AddAsset;
