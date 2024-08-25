import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";
// to do create a useAdmin 


const Dashboard = () => {


    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                logo
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
                                logged in user photo and name
                            </li>
                            <li>
                                logout button
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
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;