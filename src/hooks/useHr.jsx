import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useHr = () => {
  const { user, loading } = useAuth(); 
  const axiosSecure = useAxiosSecure(); 

  const { data: hrData, isLoading: isHrLoading } = useQuery({
    queryKey: ['hrData', user?.email], 
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
      if (!user?.email) return null; // Return null if user email is not available
      
      console.log('Fetching HR data for user', user);
      try {
        const res = await axiosSecure.get(`hrs/${user.email}`); 
        console.log('HR data fetched:', res.data);
        return res.data; // Return the entire HR object
      } catch (error) {
        console.error('Error fetching HR data:', error);
        return null; // Return null in case of an error
      }
    }
  });

  return [hrData, isHrLoading]; 
};

export default useHr;
