import { FaBook, FaCalendar, FaHome, FaList, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosPersonAdd } from "react-icons/io";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { GiMaterialsScience } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import useHr from '../hooks/useHr';
import useAuth from "../hooks/useAuth";
import useAffiliated from "../hooks/useAffiliated";



const Dashboard = () => {


    const { logOut } = useAuth();
    const [hrData] = useHr();
    const [affiliated] = useAffiliated();


    return (
        <div className="flex flex-col lg:flex-row">
            {/* dashboard side bar */}
            <div className="w-full lg:w-64 min-h-screen bg-custom-image">
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
                                    <GiMaterialsScience />
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
                                    <IoGitPullRequestSharp />
                                    Coustom requests list</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/employeeList">
                                    <FaUsers></FaUsers>
                                    My employee list</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addEmployee">
                                    <IoIosPersonAdd />
                                    Add an employee</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <CgProfile />
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

                                {affiliated ?.logo? (
                                    <div className="">
                                        <div className="w-24 h-24 rounded">
                                            <img
                                                src={affiliated.logo}
                                                alt=""
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                    </div>


                                ) : (
                                    <div className="avatar">
                                        <div className="w-24 rounded">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                                            alt="Default Avatar" 

                                            className="object-contain w-full h-full"

                                            />
                                        </div>
                                    </div>
                                )}

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
                                    <NavLink to="/dashboard/requestedAsset">
                                        <FaCalendar></FaCalendar>
                                        Requested asset</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/assetRequest">
                                        <IoGitPullRequestSharp />
                                        Request for an asset </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myTeam">
                                        <FaUsers></FaUsers>
                                        My team</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/employeeProfile">
                                        <CgProfile />
                                        profile</NavLink>
                                </li>
                                <li>
                                <div className="flex justify-between">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                            <img src={affiliated?.photo} className="w-full h-full object-cover" alt="Avatar" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-white">{affiliated?.name}</p>
                                    </div>
                                </div>
                            </li>
                                <li>
                                    <button onClick={logOut} className="btn btn-outline ">LogOut</button>
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