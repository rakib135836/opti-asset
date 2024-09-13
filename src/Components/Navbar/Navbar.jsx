
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import avatarImg from '../../assets/placeholder.jpg'
import useAuth from '../../hooks/useAuth'
import Container from './Container'
import useHr from '../../hooks/useHr'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isHr] = useHr();

  return (
    <div className='  sticky top-0 bg-white z-50 shadow-sm'>
      <div className='py-4  '>
        <Container>
          <div className='bg-gradient-to-r from-blue-100 to-blue-50 rounded-md flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}

            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/YL8gFmd/black-white-Thunder-logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
            {/* Dropdown Menu */}

            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Dash Board btn */}

                <div className=''>
                  {user && isHr && (
                    <Link to='/dashboard/adminHome'>
                      <button
                        className='text-blue-500 cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full transition'
                      >
                       Dash Board
                      </button>
                    </Link>
                  )}
                  {user && !isHr && (
                    <Link to='/dashboard/userHome'>
                      <button
                        className='text-blue-500 cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full transition'
                      >
                       Dash Board
                      </button>
                    </Link>
                  )}
                </div>

                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <div
                          onClick={logOut}
                          className=' text-blue-500 px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        {/* home link  */}
                        <Link
                          to='/'
                          className='text-blue-500 px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Home
                        </Link>

                        {/* employee register */}
                        <Link
                          to='/register'
                          className='text-blue-500 px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Join As employee
                        </Link>

                        {/* hr register */}
                        <Link
                          to='/register-hr'
                          className='text-blue-500 px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Join As Hr Manager
                        </Link>

                        {/* login */}
                        <Link
                          to='/login'
                          className='text-blue-500 px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>

                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar


