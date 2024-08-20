import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className="flex justify-center ">
            <Carousel className="max-h-[700px] my-10">
                <div className="relative h-[700px]">
                    <img src="https://i.ibb.co/WKmM5MS/employee.jpg" className="object-cover h-full w-full" />
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-4 rounded text-center">
                        <p>Join as an Employee</p>
                        {/* <Link to={'/employee'}> <button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Join Now
                        </button></Link> */}
                    </div>
                </div>
                <div className="relative h-[700px]">
                    <img src="https://i.ibb.co/tsmrqfv/hr.jpg" className="object-cover h-full w-full" />
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-4 rounded text-center">
                        <p>Join as a HR</p>
                        {/* <Link to={'/hr-manager'}> <button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Join Now
                        </button></Link> */}
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;