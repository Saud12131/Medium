import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../cofig';
import { Spinner } from '../components/spinner';
import { Link, useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
import { User, Calendar, BookOpen, Mail, Hash } from 'lucide-react';

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

export default function UserInfo() {
  const [loading, setLoading] = useState(true);
  const [userinfo, setUserinfo] = useState<UserTypes | null>(null);
  const [userblogs, setUserblogs] = useState<PostTypes[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUserinfo(response.data.userDetails);
        setUserblogs(response.data.userDetails.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
        setLoading(false);
      });
  }, [id]);

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

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
              User Blogs
              <span className="ml-auto bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {userblogs.length}
              </span>
            </h3>
          </div>
          {userblogs.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {userblogs.map((post, index) => (
                  <Link to={`/blogs/${post.id}`}>
                <div key={post.id} className={`p-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <h4 className="text-xl font-semibold mb-2 text-blue-600">{post.title}</h4>
                  <p className="text-gray-700">{post.content}</p>
                </div>
              </Link>
              ))}
            </div>
            
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-600 italic">No posts found for this user.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

