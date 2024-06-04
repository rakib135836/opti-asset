import AboutSection from "./AboutSection/AboutSection";
import Banner from "./Banner/Banner";
import Packages from "./Packages/Packages";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <AboutSection></AboutSection>
           <Packages></Packages>
        </div>
    );
};

export default Home;