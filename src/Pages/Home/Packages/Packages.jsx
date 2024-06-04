

const Packages = () => {
    return (
        <div>
            <section className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold mb-4 text-blue-400">Our Packages</h2>
                        <p className="text-lg text-gray-300">
                            Choose the package that best suits your business needs.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                            <div className="card bg-black shadow-lg p-6 rounded-lg text-center">
                                <h3 className="text-2xl font-semibold mb-2 text-blue-300">Maximum 5 Employees</h3>
                                <p className="text-gray-200 text-lg mb-4">$5 per month</p>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Choose Plan
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                            <div className="card bg-black shadow-lg p-6 rounded-lg text-center">
                                <h3 className="text-2xl font-semibold mb-2 text-blue-300">Maximum 10 Employees</h3>
                                <p className="text-gray-200 text-lg mb-4">$8 per month</p>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Choose Plan
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                            <div className="card bg-black shadow-lg p-6 rounded-lg text-center">
                                <h3 className="text-2xl font-semibold mb-2 text-blue-300">Maximum 20 Employees</h3>
                                <p className="text-gray-200 text-lg mb-4">$15 per month</p>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Choose Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Packages;