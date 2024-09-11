import useEmployeeAssets from "../../../hooks/useEmployeeAssets";



const EmployeeHome = () => {
  const { pendingRequests, monthlyRequests, isLoading } = useEmployeeAssets();

  if (isLoading) {
    return <span className="loading loading-spinner text-accent"></span>;
  }

  return (
    <div className="container mx-auto p-4">
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
      </div>
    </div>
  );
};

export default EmployeeHome;
