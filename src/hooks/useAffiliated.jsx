import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAffiliated = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: affiliated,refetch, isLoading: isAffiliatedLoading } = useQuery({
        queryKey: ['affiliated', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (!user?.email) return null;

            console.log('Fetching affiliated for user', user);
            try {
                const res = await axiosSecure.get(`/employees/${user.email}`);
                console.log(' affiliated fetched:', res.data);
                return res.data;
            } catch (error) {
                console.error('Error fetching affiliated data:', error);
                return null;
            }
        }
    });
    const notAffiliated = affiliated?.status !== 'affiliated';
    return [affiliated, isAffiliatedLoading, notAffiliated,refetch];
};

export default useAffiliated;
