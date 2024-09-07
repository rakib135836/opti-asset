import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAffiliated from "../../../hooks/useAffiliated";

const MyTeam = () => {
    const [affiliated, , notAffiliated] = useAffiliated(); // Adjusted the returned values
    const email = affiliated?.hrEmail;
    const axiosSecure = useAxiosSecure();

    const { data: members = [], isLoading, error } = useQuery({
        queryKey: ['my-team', email],  // Include email in the query key
        enabled: !!email,  // Only run the query if email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-team/${email}`);
            return res.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching team members</div>;

    // If the user is not affiliated
    if (notAffiliated) {
        return (
            <div>
                <h1>You are not affiliated with any company.</h1>
            </div>
        );
    }

    // If the user is affiliated, show the team members
    return (
        <div>

            <h1 className="text-2xl font-bold text-center py-4">My team</h1>
            <h1 className="text-base font-bold text-center py-2">HR: {email}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            

                        </tr>
                    </thead>
                    <tbody>

                        {
                            members.map((member) =>
                                <tr key={member?._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={member?.photo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{member?.name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {member?.email}

                                    </td>

                                   
                                </tr>
                            )
                        }



                    </tbody>


                </table>
            </div>




        </div>
    );
};

export default MyTeam;
