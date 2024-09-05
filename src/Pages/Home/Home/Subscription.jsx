import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Subscription = () => {
  const axiosPublic = useAxiosPublic();

  const { data: subscriptions = [], isLoading, isError, error } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const res = await axiosPublic.get('/subscriptions');
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 relative">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
          {subscriptions.map(subscription => (
            <div
              key={subscription?._id}
              className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="flex-shrink-0">
                <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-blue-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                  {subscription?.name}
                </h2>
              </div>

              <div className="flex-shrink-0">
                <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                  ${subscription?.price}
                </span>
              </div>

              <div className="flex-shrink-0">
                <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                  members:{subscription?.members}
                </span>
              </div>

              <Link to={`/payment/${subscription?._id}`}>
                <button className="inline-flex items-center justify-center px-4 py-2 font-medium text-white uppercase transition-colors bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none">
                  purse
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
