

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../Components/SocialLogin/SocilaLogin';
import SocialLoginHr from '../../Components/SocialLoginHr/SocialLoginHr';


const Login = () => {

   const {signIn}=useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)



    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
      
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }



    return (
        <>
            <Helmet>
                <title>opti-asset | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-blue-100">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <img className='rounded-md' src="https://i.ibb.co/ZVLmF3F/undraw-Sign-in-re-o58h.png" alt="" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />

                            </div>

                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className='px-6'>
                            <small className='text-blue-400'>New Here?</small>
                            <ul>
                                <li><Link to='/register' className='text-blue-500'>join as an employee</Link></li>
                                <li><Link to='/register-hr' className='text-blue-500'>join as an hr manager</Link></li>
                            </ul>
                        </div>

                       <div className='flex justify-between items-center'>
                       <SocialLogin></SocialLogin>
                       <SocialLoginHr></SocialLoginHr>
                       </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;