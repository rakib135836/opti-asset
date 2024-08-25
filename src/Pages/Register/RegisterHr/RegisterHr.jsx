




import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2'
// import SocialLogin from "../../Components/SocialLogin/SocilaLogin";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";

import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const RegisterHr = () => {
    // const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const { createUser, updateUserProfile } = useContext(AuthContext);
    const {createUser,updateUserProfile}=useAuth();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        // axiosPublic.post('/users', userInfo)
                        //     .then(res => {
                        //         if (res.data.insertedId) {
                        //             console.log('user added to the database')
                        //             reset();
                        //             Swal.fire({
                        //                 position: 'top-end',
                        //                 icon: 'success',
                        //                 title: 'User created successfully.',
                        //                 showConfirmButton: false,
                        //                 timer: 1500
                        //             });
                        //             navigate('/');
                        //         }
                            // })


                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <>
            <Helmet>
                <title>opti-asset |Hr Manager Register</title>
            </Helmet>
            <div className="hero min-h-screen bg-blue-100">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register as an Hr Manager</h1>
                        <img className="rounded-md" src="https://i.ibb.co/fkVMJ3T/undraw-Sign-up-n6im.png" alt="" />
                    </div>

                    
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Company Name</span>
                                </label>
                                <input type="text"  {...register("CompanyName", { required: true })} name="CompanyName" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">CompanyName is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of birth</span>
                                </label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="input input-bordered w-full"
                                    
                                    
                                />
                                
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Company logo</span>
                                </label>
                                <input type="text"  {...register("CompanyLogo", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">company logo is   required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">HR photo</span>
                                </label>
                                <input type="text"  {...register("HrPhoto", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">hr photo is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />
                                {/* {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>} */}
                                
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="px-6"><small>Already have an account <Link to="/login"className="text-blue-500">Login</Link></small></p>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterHr;