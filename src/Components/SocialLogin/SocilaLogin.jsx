import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
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
                photo: result.user?.photoURL,
                identity:'employee'
            }
            axiosPublic.post('/employees', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div className="p-2">
            
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                 Employee
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;