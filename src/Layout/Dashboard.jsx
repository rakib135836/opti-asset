import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useHr from '../hooks/useHr';
import useAuth from "../hooks/useAuth";



const Dashboard = () => {


    const { logOut } = useAuth();
    const [hrData] = useHr();


    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-custom-image">
                <ul className="menu p-4">
                    {
                        hrData ? <>
                            <li>
                                {hrData?.logo ? (
                                    <div className="">
                                        <div className="w-24 h-24 rounded">
                                            <img
                                                src={hrData.logo}
                                                alt=""
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                    </div>


                                ) : (
                                    <div className="avatar">
                                        <div className="w-24 rounded">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Default Avatar" />
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Hr Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/assetList">
                                    <FaUtensils></FaUtensils>
                                    Asset List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addAsset">
                                    <FaList></FaList>
                                    Add an Asset</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allRequests">
                                    <FaBook></FaBook>
                                    All requests</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/coustomRequests">
                                    <FaUsers></FaUsers>
                                    Coustom requests list</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/employeeList">
                                    <FaUsers></FaUsers>
                                    My employee list</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addEmployee">
                                    <FaUsers></FaUsers>
                                    Add an employee</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <FaUsers></FaUsers>
                                    profile</NavLink>
                            </li>
                            <li>
                                <div className="flex justify-between">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                            <img src={hrData.photo} className="w-full h-full object-cover" alt="Avatar" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-white">{hrData.name}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button onClick={logOut} className="btn btn-outline ">LogOut</button>
                            </li>
                        </>
                            :
                            <>

                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        Employee Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myAsset">
                                        <FaCalendar></FaCalendar>
                                        My asset</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/assetRequest">
                                        <FaShoppingCart></FaShoppingCart>
                                        Request for an asset </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myTeam">
                                        <FaAd></FaAd>
                                        My team</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/employeeProfile">
                                        <FaUsers></FaUsers>
                                        profile</NavLink>
                                </li>
                                <li>
                                    logged in user photo and name
                                </li>
                                <li>
                                    logout button
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>

                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8 bg-blue-50">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;