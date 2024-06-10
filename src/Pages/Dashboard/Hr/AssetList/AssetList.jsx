

import { useMutation, useQuery } from '@tanstack/react-query';



import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

import RoomDataRow from '../../../../components/Dashboard/TableRows/RoomDataRows';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';


const AssetList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    // Fetch asset  Data
    const {
        data: assets = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['asset-lists', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/asset-lists/${user?.email}`);
            return data;
        },
    });

    // Delete asset
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/asset/${id}`);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            refetch();
            toast.success('Successfully deleted.');
        },
    });

    // Handle Delete
    const handleDelete = async (id) => {
        console.log(id);
        try {
            await mutateAsync(id);
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            

            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Product
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Quantity
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            type
                                        </th>
                                        
                                        
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Delete
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assets.map((asset) => (
                                        <RoomDataRow
                                            key={asset._id}
                                            asset={asset}
                                            handleDelete={handleDelete}
                                            refetch={refetch}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetList;
