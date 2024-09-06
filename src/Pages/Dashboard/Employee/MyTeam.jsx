import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyTeam = () => {

    const axiosSecure=useAxiosSecure();
    const { data: members = [] } = useQuery({
        queryKey: ['my-team'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-team/');
            return res.data;
        }
    });
    return (
        <div>
            my team 
        </div>
    );
};

export default MyTeam;