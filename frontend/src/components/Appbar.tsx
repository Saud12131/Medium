import { Avatar } from './Card';
import { Link, useNavigate } from 'react-router-dom';

export default function Appbar() {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin")
    }
    let token = localStorage.getItem("token");

    return (
        <div className="border-b flex flex-col sm:flex-row items-center justify-between px-4 py-3 sm:px-6 md:px-10">
            <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <h2 className="font-bold text-xl sm:text-2xl">Medium</h2>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4">
                {token ? (
                    <>
                        <button
                            className="bg-red-500 text-white py-1 px-3 sm:px-4 text-sm sm:text-base rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <Link to={"/create"}>
                            <button
                                className="bg-blue-500 text-white py-1 px-3 sm:px-4 text-sm sm:text-base rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                            >
                                Create New Blog
                            </button>
                        </Link>
                        <Link to={'/profile'} className="mt-2 sm:mt-0">
                            <Avatar authorname={"User"} />
                        </Link>
                    </>
                ) : (
                    <button
                        className="bg-green-500 text-white py-1 px-3 sm:px-4 text-sm sm:text-base rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                        onClick={() => navigate("/signin")}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}

