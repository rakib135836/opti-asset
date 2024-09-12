import useEmployeeAssets from "../../../hooks/useEmployeeAssets";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { Helmet } from "react-helmet-async";

const EmployeeHome = () => {
  const { pendingRequests, monthlyRequests, isLoading } = useEmployeeAssets();
  const [value, setValue] = useState(new Date()); 
  

  if (isLoading) {
    return <span className="loading loading-spinner text-accent"></span>;
  }

  
  
  return (
    <div className="container mx-auto p-4">

      <Helmet>
        <title>Employee | Home</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center py-4">Employee Home</h1>

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

        {/* Monthly Requests */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-bold pb-2">Requests Made This Month</h2>
          {monthlyRequests?.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Asset</th>
                  <th className="px-4 py-2">Request Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="border px-4 py-2">{request.asset}</td>
                    <td className="border px-4 py-2">{request.requestedDate}</td>
                    <td className="border px-4 py-2">{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests made this month</p>
          )}
        </div>

        {/* Calendar */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-bold pb-2">Calendar</h2>
          <Calendar onChange={setValue} value={value} />
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

export default EmployeeHome;
