import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useHr from "../hooks/useHr";



const PaidRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [hrData, isHrLoading,isPaid]=useHr();
    const location = useLocation();
    

    if (loading ||isHrLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && hrData && isPaid) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default PaidRoute;