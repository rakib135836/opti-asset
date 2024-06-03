

const Footer = () => {
    return (
        <div>
            <div className="my-5">
                <footer className="bg-white dark:bg-gray-900">
                    <div className="container p-6 mx-auto">
                        <div className="lg:flex">
                            <div className="w-full -mx-6 lg:w-2/5">
                                <div className="px-6">
                                    <h1 className="text-3xl font-bold text-blue-500">OptiAsset</h1>
                                    <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                                        Join 31,000+ others and manage your business effortlessly
                                    </p>
                                    <div className="flex mt-6 -mx-2">
                                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM6.807 10.543c-.598-.001-1.136.364-1.357.92-.22.557-.078 1.191.357 1.602a1.567 1.567 0 0 0 .392.335c-.013.146-.013.293 0 .439 0 2.24 2.615 4.062 5.829 4.062 3.213 0 5.829-1.822 5.829-4.062.011-.146.011-.293 0-.439.607-.294.928-.971.773-1.628-.155-.657-.745-1.118-1.42-1.109h-.053c-.358.013-.699.158-.957.407-1.137-.773-2.474-1.2-3.85-1.23l.65-3.12 2.138.45c.055.507.483.891.993.892.036 0 .072-.002.108-.005.53-.053.925-.512.898-1.044-.027-.533-.466-.95-1-.95-.038.001-.076.004-.113.008-.317.034-.599.216-.759.492L12.82 6c-.021-.004-.043-.007-.065-.007-.144.002-.268.103-.299.245l-.748 3.473c-1.392-.02-2.748.406-3.9 1.188-.27-.255-.628-.396-.999-.396zM12.18 16.524c-.056 0-.113 0-.169.002-.056 0-.113-.002-.169-.002-.83-.004-1.637-.275-2.3-.774-.045-.055-.067-.126-.06-.197.007-.071.042-.136.097-.181.048-.04.109-.062.171-.062s.123.022.171.062c.561.411 1.238.632 1.933.63.059 0 .118 0 .178.002.059 0 .118-.002.178-.002.686-.001 1.355-.216 1.913-.616.052-.055.124-.085.198-.085.073 0 .144.03.198.085.108.112.106.291-.004.403-.664.499-1.472.77-2.306.774h-.001zM14.307 14.08h-.016l.008-.039c-.44-.03-.8-.362-.865-.798-.065-.436.182-.859.594-1.017.412-.158.878-.007 1.12.361.243.369.196.856-.111 1.172-.18.195-.43.31-.695.32H14.307zm-4.637-.08c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"></path>
                                            </svg>
                                        </a>
                                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.002 12.002c.001 4.92 3.578 9.108 8.437 9.879V14.892h-2.54v-2.89h2.541v-2.2c-.113-1.043.243-2.082.973-2.836.73-.755 1.757-1.145 2.803-1.066.75.012 1.499.079 2.24.2v2.459h-1.264c-.435-.057-.872.087-1.19.391-.316.304-.477.735-.438 1.172v1.878h2.771l-.443 2.891h-2.328v6.988c5.254-.831 8.939-5.63 8.384-10.921C21.392 5.67 16.793 1.74 11.48 2.017 6.168 2.294 2.003 6.682 2.002 12.002z"></path>
                                            </svg>
                                        </a>
                                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.026 2c-4.893.001-9.064 3.549-9.847 8.378-.783 4.83 2.052 9.516 6.695 11.062.5.09.679-.217.679-.481 0-.237-.008-.865-.011-1.7-2.775.6-3.361-1.338-3.361-1.338-.183-.603-.576-1.12-1.107-1.458-.9-.619.07-.633.07-.633.641.088 1.204.468 1.526 1.03.273.497.733.863 1.277 1.019.545.155 1.129.087 1.623-.19.046-.506.271-.979.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-.989.367-1.945 1.038-2.671-.303-.86-.268-1.804.099-2.639 0 0 .837-.269 2.742 1.021 1.634-.448 3.358-.448 4.992 0 1.905-1.29 2.742-1.021 2.742-1.021.367.835.402 1.779.099 2.639.67.726 1.038 1.682 1.038 2.671 0 3.788-2.33 4.73-4.552 4.978.479.49.725 1.163.675 1.847 0 1.332-.011 2.409-.011 2.737 0 .266.178.573.678.481 4.641-1.546 7.477-6.232 6.692-11.062C21.089 5.546 16.918 1.999 12.026 2z"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 lg:mt-0 lg:flex-1">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    <div>
                                        <h3 className="text-gray-700 uppercase dark:text-white">About</h3>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Company</a>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Community</a>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Careers</a>
                                    </div>
                                    {/* <div>
                                        <h3 className="text-gray-700 uppercase dark:text-white">Blog</h3>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Tech</a>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Music</a>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Videos</a>
                                    </div> */}
                                    {/* <div>
                                        <h3 className="text-gray-700 uppercase dark:text-white">Products</h3>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Mega Cloud</a>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Aperion UI</a>
                                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Meraki UI</a>
                                    </div> */}
                                    <div>
                                        <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
                                        <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">+1 526 654 8965</span>
                                        <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">example@email.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
                        <div>
                            <p className="text-center text-gray-500 dark:text-gray-400">© Brand 2024 - All rights reserved</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;