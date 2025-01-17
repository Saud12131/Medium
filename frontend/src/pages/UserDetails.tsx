import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../cofig';
import { Spinner } from '../components/spinner';
import Appbar from '../components/Appbar';
import { User, Calendar, Mail, Hash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
export interface UserTypes {
    name: string;
    email: string;
    id: string;
}

export interface PostTypes {
    content: string;
    title: string;
    id: string;
}

export default function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [userinfo, setUserinfo] = useState<UserTypes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [blogs, setblogs] = useState<PostTypes[] | null>([]);
    const navigate = useNavigate();
    const handelDelete = async ({ id }: { id: string }) => {
        try {


            let token = localStorage.getItem('token');
            if (!token) {
                console.log("token not found");
                return;
            }
            let res = await axios.delete(`${BACKEND_URL}/api/v1/post/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status = 200) {
                navigate("/blogs")
            }
        } catch (err) {
            alert("error");
            console.log(err);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setUserinfo(response.data.user)
                setblogs(response.data.user.posts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setError(error)
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Appbar />
                <div className="h-[calc(100vh-64px)] flex items-center justify-center">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Appbar />
                <div className="h-[calc(100vh-64px)] flex items-center justify-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md">
                        <p className="font-semibold">Error</p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center">
                        <div className="inline-block bg-white rounded-full p-3 mb-4 shadow-lg">
                            <User className="w-24 h-24 text-blue-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">{userinfo?.name}</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center justify-center md:justify-start">
                                <Mail className="w-5 h-5 mr-2 text-gray-500" />
                                <span className="text-gray-700">{userinfo?.email}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <Hash className="w-5 h-5 mr-2 text-gray-500" />
                                <span className="text-gray-700">ID: {userinfo?.id}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                <span className="text-gray-700">Member since January 2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Blogs Section */}
            <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">My Blogs</h2>
                </div>
                <div className="p-6">
                    {blogs?.length ? (
                        <div className="grid grid-cols-1 gap-6">
                            {blogs.map((post) => (
                                <div key={post.id} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col space-y-4">
                                    <Link to={`/blogs/${post.id}`}>
                                        <h3 className="text-xl font-bold mb-2 text-teal-600 hover:underline">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-700">{post.content}</p>
                                    </Link>
                                    <button
                                        onClick={() => handelDelete({ id: post.id })}
                                        className="self-start bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => navigate(`/editblog/${post.id}`)}
                                        className="self-start bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 text-center">
                            You have not written any blogs yet.
                        </p>
                    )}
                </div>
            </div>
        </div>



    );
}