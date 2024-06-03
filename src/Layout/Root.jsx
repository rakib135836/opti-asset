import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";


const Root = () => {
    return (
        <div>
            <div className="my-5">
            <NavBar></NavBar>
            </div>
            <Outlet></Outlet>

            <div className="my-5">
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;