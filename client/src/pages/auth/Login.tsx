import { SiBloglovin } from "react-icons/si";
import { Link } from "react-router";

export const Login = () => {
    return (
        <div className="w-screen h-full flex items-center justify-center mt-[20vh]">
            <div className="flex flex-col justify-center font-[sans-serif] p-4">
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <a href="http://localhost:4000">
                            <div className="flex justify-center items-center flex-row w-full gap-1 text-gray-700">
                                <SiBloglovin className='mb-1' />
                                <p className="font-bolder">Logify</p>
                            </div>
                        </a>
                    </div>

                    <form>
                        <div className="space-y-6">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                <input name="email" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <input name="password" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                            </div>
                        </div>

                        <div className="!mt-8">
                            <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                Login
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm mt-6 text-center">Don't have  an account? <Link className="text-blue-600 font-semibold hover:underline ml-1" to="/signup">Signup now</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
