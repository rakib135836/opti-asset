import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const MyAsset = () => {

    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();


    const { data: myassets = [], isLoading } = useQuery({
        queryKey: ['my-asset', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-asset/${email}`);
            return res.data;
        }
    })

    if (isLoading) {
        <span className="loading loading-spinner text-accent"></span>
    }

    return (
        <div>

            <Helmet>
                <title>Employee | My Asset</title>
            </Helmet>
            {myassets?.length > 0 ? (
                <>
                    <h1 className="text-2xl font-bold text-center py-4">My Assets</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* Table head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>

                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {myassets.map((request) => (
                                    <tr key={request?._id}>

                                        <td>{request?.asset}</td>
                                        <td>{request?.assetType}</td>

                                        <td>{request?.status}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p>No asset found</p>
            )}
        </div>
    );
};

export default MyAsset;