import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";


const SocialLoginHr = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
                companyName:'',
                birthDate:'',
                logo:'',
                employees:[],
                status:'',                
                photo: result.user?.photoURL,
                identity:'hr'
            }
            axiosPublic.post('/hrs', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div>
             <div className="p-2">
            
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                 Hr Manager
                </button>
            </div>
        </div>
        </div>
    );
};

export default SocialLoginHr;