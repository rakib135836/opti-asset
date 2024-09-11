import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useEmployeeAssets = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const today = new Date();
  const month = today.getMonth() + 1


  const { data: pendingRequests = [], isLoading: loadingPending } = useQuery({
    queryKey: ['employee-pending-requests', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-requests/pending/${email}`);
      return res.data;
    },
  });


  const { data: monthlyRequests = [], isLoading: loadingMonthly } = useQuery({
    queryKey: ['employee-monthly-requests', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-requests/month/${email}`, {
        params: {
          month:month
        },
      });
      return res.data;
    },
  });

  return {
    pendingRequests,
    monthlyRequests,
    isLoading: loadingPending || loadingMonthly,
  };
};

export default useEmployeeAssets;
