

const AboutSection = () => {
    return (
        <div>
            <section className="bg-white   dark:bg-gray-900">
                <div className="container  px-6 py-10 mx-auto">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Our Asset Management Solution </h1>

                        <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        Our web app helps businesses manage their assets and products efficiently. By purchasing a subscription, any company can benefit from our powerful
                         tools designed to make asset tracking easier for HR Managers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                        <div>
                            <img className="relative z-10 object-cover w-full  rounded-md h-96" src="https://i.ibb.co/2Sf764B/undraw-Content-structure-re-ebkv.png" alt="" />

                            <div className="relative z-20 max-w-md p-6 mx-auto -mt-20 bg-blue-100 rounded-md shadow dark:bg-gray-900">
                                <h1 href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                                    Track Assets & Manage Products
                                </h1>

                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                    Easily track how employees are using company assets .Keep an inventory
                                    of products, monitor stock levels, and manage product lifecycle seamlessly.
                                </p>

                               
                            </div>
                        </div>

                        <div>
                            <img className="relative z-10 object-cover w-full  rounded-md h-96" src="https://i.ibb.co/1bXVCnJ/undraw-subscriptions-re-k7jj.png" alt="" />

                            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-blue-100  rounded-md shadow dark:bg-gray-900">
                                <h1 href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                                    Subscription-Based
                                </h1>

                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                    Flexible subscription plans that cater to the needs of
                                    different businesses, ensuring affordability and scalability.
                                </p>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;