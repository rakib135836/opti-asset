import { Helmet } from "react-helmet-async";
import AboutSection from "./AboutSection";
import Banner from "./Banner";
import Subscription from "./Subscription";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>opti-asset | Home</title>
            </Helmet>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <Subscription></Subscription>
        </div>
    );
};

export default Home;