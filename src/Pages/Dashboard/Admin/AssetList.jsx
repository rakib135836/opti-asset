import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAsset from "../../../hooks/useAsset";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHr from "../../../hooks/useHr";
import { Link } from "react-router-dom";
import { useState } from "react";

const AssetList = () => {
    const [asset, refetch] = useAsset();
    const axiosSecure = useAxiosSecure();
    const [hrData] = useHr();

    const [searchTerm, setSearchTerm] = useState('');
    const [stockFilter, setStockFilter] = useState('');
    const [assetTypeFilter, setAssetTypeFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleDelete = id => {
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
                axiosSecure.delete(`/assets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    // Search, Filter, and Sort logic
    const filteredAssets = asset
        .filter(item => 
            item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) && 
            (stockFilter === '' || (stockFilter === 'available' && item?.quantity > 0) || (stockFilter === 'out-of-stock' && item?.quantity === 0)) &&
            (assetTypeFilter === '' || item?.type === assetTypeFilter)
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.quantity - b.quantity;
            if (sortOrder === 'desc') return b.quantity - a.quantity;
            return 0;
        });

    return (
        <div>
            <h1 className="text-center text-3xl font-bold mb-3">Asset List of {hrData?.name}</h1>
            <h1 className="text-center text-sm font-bold mb-3">Available assets ({filteredAssets?.length})</h1>

            {/* Search Section */}
            <div className="my-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                {/* Filter by Stock Status */}
                <select
                    onChange={(e) => setStockFilter(e.target.value)}
                    value={stockFilter}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">All Stock Status</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
                {/* Filter by Asset Type */}
                <select
                    onChange={(e) => setAssetTypeFilter(e.target.value)}
                    value={assetTypeFilter}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Not Returnable">Not Returnable</option>
                </select>
                {/* Sorting by Quantity */}
                <select
                    onChange={(e) => setSortOrder(e.target.value)}
                    value={sortOrder}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Sort by Quantity</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item?.name}</td>
                                <td>{item?.type}</td>
                                <td>{item?.quantity > 0 ? item?.quantity : 'Out of Stock'}</td>
                                <td>{item?.addedDate}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                    <Link to={`/dashboard/updateAsset/${item._id}`}>
                                        <button className="btn bg-blue-500">
                                            <FaEdit className="text-white" />
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;
