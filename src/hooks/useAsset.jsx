

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useHr from "./useHr";

const useAsset = () => {
    const axiosSecure = useAxiosSecure();
    const [hrData]=useHr();
    const { refetch, data: asset = [] } = useQuery({
        queryKey: ['asset', hrData?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/assets?email=${hrData?.email}`);
            return res.data;
        }
    })

    

    return [asset, refetch]
};

export default useAsset;