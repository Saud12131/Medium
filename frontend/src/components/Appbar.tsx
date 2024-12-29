
import { Avatar } from './Card';
import { Link, useNavigate } from 'react-router-dom';
export default function Appbar() {
    let navigate = useNavigate();
    const handelLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin")
    }
    let token = localStorage.getItem("token");
    return (
        <div className="border-b flex items-center justify-between px-6 py-3 sm:px-10">
            <div className="flex-grow text-center">
                <h2 className="font-bold text-xl sm:text-2xl">Medium</h2>
            </div>
            <div className="flex items-center space-x-4">

                {token ? (

                    <button
                        className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handelLogout}
                    >
                        Logout
                    </button>

                ) : (

                    <button
                        className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => navigate("/signin")}
                    >
                        Login
                    </button>
                )}
                {!token ? (
                    <button
                        className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => navigate("/signin")}
                    >
                        Login
                    </button>
                ) : (
                    <>
                        <Link to={"/create"}>
                            <button
                                className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Create New Blog
                            </button>
                        </Link>
                        <Link to={'/profile'}>
                            <Avatar authorname={"User"} />
                        </Link>
                    </>
                )}


            </div>
        </div>
    );
}
