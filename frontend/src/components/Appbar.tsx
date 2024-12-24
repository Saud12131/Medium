
import { Avatar } from './Card';
import { Link } from 'react-router-dom';
export default function Appbar() {
    const handelLogout = () => {
        localStorage.removeItem("token");
    }
    return (
        <div className="border-b flex items-center justify-between px-6 py-3 sm:px-10">
            <div className="flex-grow text-center">
                <h2 className="font-bold text-xl sm:text-2xl">Medium</h2>
            </div>
            <div className="flex items-center space-x-4">
                <Link to={"/"}>
                    <button
                        className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handelLogout}
                    >
                        Logout
                    </button>
                </Link>
                <Link to={"/create"}>
                    <button
                        className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Create New Blog
                    </button>
                </Link>
                <div>
                    <Avatar authorname="saud" />
                </div>
            </div>
        </div>
    );
}
