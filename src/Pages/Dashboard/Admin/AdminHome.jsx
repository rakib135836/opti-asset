import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHr from "../../../hooks/useHr";
import { PieChart } from 'react-minimal-pie-chart';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Helmet } from "react-helmet-async";


const AdminHome = () => {

    const axiosSecure = useAxiosSecure();
    const [hrData] = useHr();
    const email = hrData?.email;

    const { data: pendingRequests = [], isLoading } = useQuery({
        queryKey: ['hrHome-pending-requests', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/hr-home/pending/${email}`);
            return res.data;
        },
    });
    const { data: mostRequested = [] } = useQuery({
        queryKey: ['hrHome-most-requested', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/top-requested-assets/${email}`);
            return res.data;
        },
    });
    const { data: limitedStockItems = [] } = useQuery({
        queryKey: ['hrHome-limited-Stock-Items', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/limited-stock-items/${email}`);
            return res.data;
        },
    });

    // Fetch Returnable and Not Returnable asset counts
    const { data: assetTypeCount = [] } = useQuery({
        queryKey: ['hrHome-asset-type-count', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/asset-type-count/${email}`);
            return res.data;
        },
    });

    const pieChartData = assetTypeCount.map((type) => ({
        title: type._id, // 'Returnable' or 'Not Returnable'
        value: type.count, // Count of assets
        color: type._id === 'Returnable' ? '#4CAF50' : '#F44336', // Choose colors for each type
    }));

    if (isLoading) {
        return <span className="loading loading-spinner text-accent"></span>;
    }
    return (
        <div className="container mx-auto p-4">

            <Helmet>
                <title>Hr | Home</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center py-4">HR Home</h1>

            {/* Grid layout for side-by-side tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Pending Requests */}
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-xl font-bold pb-2">Pending Requests</h2>
                    {pendingRequests?.length > 0 ? (
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Asset</th>
                                    <th className="px-4 py-2">Request Date</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map((request) => (
                                    <tr key={request._id}>
                                        <td className="border px-4 py-2">{request.asset}</td>
                                        <td className="border px-4 py-2">{request.requestedDate}</td>
                                        <td className="border px-4 py-2">{request.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending requests</p>
                    )}
                </div>

                {/* most requested  */}
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-xl font-bold pb-2">Top Requested Assets </h2>
                    {mostRequested.length > 0 ? (
                        <ul>
                            {mostRequested.map((item) => (
                                <li key={item._id} className="py-2">
                                    {item._id}: {item.count} requests
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No asset requests available</p>
                    )}
                </div>


                {/* Limited Stock Items */}
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-xl font-bold pb-2">Limited Stock Items</h2>
                    {limitedStockItems.length > 0 ? (
                        <ul>
                            {limitedStockItems.map((stock) => (
                                <li key={stock._id} className="py-2">
                                    {stock.name}: {stock.quantity} left
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No limited stock items available</p>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-bold pb-2">Asset Type Distribution</h2>
                    <PieChart
                        data={pieChartData}
                        label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`} // Display labels
                        labelStyle={{
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        }}
                        animate
                    />
                </div>


                {/* Calendar */}
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-xl font-bold pb-2">Calendar</h2>
                    <Calendar />
                </div>

                {/* Add Note Section */}
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h3 className="text-lg font-semibold">Add a Note</h3>
                    <textarea
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Write your note here..."
                        rows="4"

                    ></textarea>
                    <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;