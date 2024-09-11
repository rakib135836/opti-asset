import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useHr = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: hrData,refetch, isLoading: isHrLoading } = useQuery({
    queryKey: ['hrData', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!user?.email) return null;

      console.log('Fetching HR data for user', user);
      try {
        const res = await axiosSecure.get(`hrs/${user.email}`);
        console.log('HR data fetched:', res.data);
        return res.data;
      } catch (error) {
        console.error('Error fetching HR data:', error);
        return null;
      }
    }
  });
  const isPaid = hrData?.status === 'paid';
  return [hrData, isHrLoading, isPaid,refetch];
};

export default useHr;
