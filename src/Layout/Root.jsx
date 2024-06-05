import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";




const Root = () => {
    return (
        <div>
            <div className="my-5">
           <Navbar></Navbar>
            </div>
            <Outlet></Outlet>

            <div className="my-5">
            
            </div>
        </div>
    );
};

export default Root;