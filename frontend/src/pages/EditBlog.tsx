import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../cofig';
import { useftechBlog } from '../hooks/BlogHook';
import { Spinner } from '../components/spinner';
type BlogTypes = {
    title: string;
    content: string;
}

export default function EditBlog() {
    const { id } = useParams();
    let { blog } = useftechBlog({ id: id || '' });
    let navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [formdata, setformdata] = useState<BlogTypes>({
        title: '',
        content: '',
    });

    useEffect(() => {
        if (blog) {
            setformdata({
                title: blog.title,
                content: blog.content
            });
        }

    }, [blog]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setloading(true);
        try {
            let response = await axios.put(`${BACKEND_URL}/api/v1/post/update/${id}`, formdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status = 200) {
                navigate("/blogs")
            }
        } catch (err) {
            console.log(err);
            setloading(false);
            navigate("/blogs")
        }

    }
    if (!blog) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    return <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center bg-white p-8 shadow-lg rounded-md">
            <label htmlFor="title">Update title</label>
            <input
                type="text"
                name="title"
                value={formdata.title}
                onChange={handleChange}
                placeholder="Update the title"
                className="m-4 p-2 border border-gray-300 rounded-md w-80"
            />
            <label htmlFor="title">Update description</label>
            <input
                type="text"
                name="content"
                value={formdata.content}
                onChange={handleChange}
                placeholder="Update the description"
                className="m-4 p-2 border border-gray-300 rounded-md w-80"
            />
            <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                disabled={loading}
                onClick={handleSubmit}
            >
                <h2 className='flex justify-center items-center'>
                    {loading ? <Spinner /> : 'Update Blog'}
                </h2>
            </button>
        </div>
    </div>
}

