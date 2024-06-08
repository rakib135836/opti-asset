


const AddAsset = () => {
    return (
        <div>
          <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center">Add an Asset</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form  className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" name="Name" placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Quantity</span>
                                </label>
                                <input type="text" name="quantity" placeholder="product quantity" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">product type</span>
                                </label>
                                <input type="text" name="etype" placeholder="returnable or non returnable" className="input input-bordered" required />
                            </div>
                           
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default AddAsset;