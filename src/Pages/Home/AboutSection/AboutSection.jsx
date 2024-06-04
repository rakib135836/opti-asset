

const AboutSection = () => {
    return (
        <section className=" text-white py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-4 text-blue-400">About Our Asset Management Solution</h2>
                    <p className="text-lg text-gray-300">
                        Our web app helps businesses manage their assets and products efficiently. 
                        By purchasing a subscription, any company can benefit from our powerful tools 
                        designed to make asset tracking easier for HR Managers.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <div className="card bg-blue-900 shadow-lg p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-2 text-blue-300">Track Assets</h3>
                            <p className="text-gray-200">
                                Easily track how employees are using company assets and ensure optimal utilization 
                                and maintenance.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <div className="card bg-blue-900 shadow-lg p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-2 text-blue-300">Manage Products</h3>
                            <p className="text-gray-200">
                                Keep an inventory of products, monitor stock levels, and manage product lifecycle 
                                seamlessly.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <div className="card bg-blue-900 shadow-lg p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-2 text-blue-300">Subscription-Based</h3>
                            <p className="text-gray-200">
                                Flexible subscription plans that cater to the needs of different businesses, ensuring 
                                affordability and scalability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
