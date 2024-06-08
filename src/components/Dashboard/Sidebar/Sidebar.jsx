import { useState } from 'react'
import { GrLogout} from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'

// import { GrUserAdmin } from 'react-icons/gr'   BsFingerprint,
import { MdAssignmentAdd,  MdOutlineGroups2 } from 'react-icons/md'
import { AiOutlineBars } from 'react-icons/ai'

import { NavLink } from 'react-router-dom'

import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { IoHome } from 'react-icons/io5'
import { FaClipboardList } from 'react-icons/fa'
import { IoIosPersonAdd } from 'react-icons/io'
import { VscGitPullRequestGoToChanges, VscRequestChanges } from 'react-icons/vsc'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <h1>opti-Asset</h1>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
                <h1>opti-Asset</h1>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <NavLink
                to='hr-home'
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                < IoHome className='w-5 h-5' />

                <span className='mx-4 font-medium'>Home</span>
              </NavLink>

              {/* Add asset */}
              <NavLink
                to='add-asset'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <MdAssignmentAdd className='w-5 h-5' />

                <span className='mx-4 font-medium'>Add an Asset</span>
              </NavLink>
              {/*asset list */}
              <NavLink
                to='asset-list'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <FaClipboardList className='w-5 h-5' />

                <span className='mx-4 font-medium'>Asset List</span>
              </NavLink>
              {/* Add  employee*/}
              <NavLink
                to='add-employee'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoIosPersonAdd className='w-5 h-5' />

                <span className='mx-4 font-medium'>Add an Employee</span>
              </NavLink>
              {/*employee list  */}
              <NavLink
                to='my-employee'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <MdOutlineGroups2 className='w-5 h-5' />

                <span className='mx-4 font-medium'>My Employee</span>
              </NavLink>
              {/* All request */}
              <NavLink
                to='all-request'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <VscRequestChanges className='w-5 h-5' />

                <span className='mx-4 font-medium'>All Request </span>
              </NavLink>
              {/*employee list  */}
              <NavLink
                to='custom-request'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                < VscGitPullRequestGoToChanges className='w-5 h-5' />

                <span className='mx-4 font-medium'>Custom Request List</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar

// --------------------