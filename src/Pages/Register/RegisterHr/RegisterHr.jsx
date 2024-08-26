




import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SocialLoginHr from "../../../Components/SocialLoginHr/SocialLoginHr";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const RegisterHr = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async (data) => {
        console.log(data);

        // sending img to img bb and gating the img url 
        // Preparing the first image for upload
        const imageFile = new FormData();
        imageFile.append('image', data.image[0]);


        const res1 = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res1);

        const imageFile2 = new FormData();
        imageFile2.append('image', data.image2[0]);


        const res2 = await axiosPublic.post(image_hosting_api, imageFile2, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        console.log(res2);


        if (res1.data.success && res2.data.success) {
            const companyLogo = res1.data.data.url; 
            const hrPhoto = res2.data.data.url; 

            console.log('Image URLs:',companyLogo,hrPhoto);


            createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            companyName:data.companyName,
                            birthDate:startDate,
                            logo:companyLogo,
                            photo:hrPhoto,
                            email: data.email,
                            identity:'hr'
                        }
                        axiosPublic.post('/hrs', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('Hr info added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Hr created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                        })


                    })
                    .catch(error => console.log(error))
            })

        }



        
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
                                <input type="text"  {...register("companyName", { required: true })} name="companyName" placeholder="Name" className="input input-bordered" />
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

                            {/* company logo  */}

                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Company logo</span>
                                </label>
                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />

                            </div>

                            {/* hr photo  */}

                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">HR Photo</span>
                                </label>
                                <input {...register('image2', { required: true })} type="file" className="file-input w-full max-w-xs" />

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
                        <p className="px-6"><small>Already have an account <Link to="/login" className="text-blue-500">Login</Link></small></p>
                        <SocialLoginHr></SocialLoginHr>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterHr;