//56:00
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../cofig'
import { Spinner } from '../components/spinner'
export default function SignUpPage() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, formData);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (err) {
            if (err) {
                setLoading(false);
                alert("something went wrong");
            }
            console.log(err);
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Section - Sign Up Form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 flex items-center justify-center">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                        <p className="text-gray-500">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-gray-900 underline underline-offset-4 hover:text-gray-600">
                                Login
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    email
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    name
                                </label>
                                <input
                                    id="name"
                                    type="name"
                                    placeholder="m@example.com"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    autoComplete='current-password'

                                    id="password"
                                    type="password"
                                    placeholder='create a password'
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                            disabled={loading}
                        >
                            <h2 className='flex justify-center items-center'>
                                {loading ? <Spinner /> : 'Sign Up'}
                            </h2>
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Section - Testimonial */}
            <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-12">
                <div className="max-w-md">
                    <blockquote className="space-y-4">
                        <p className="text-2xl font-medium leading-relaxed">
                            "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                        </p>
                        <footer>
                            <cite className="not-italic">
                                <div className="font-semibold">Jules Winnfield</div>
                                <div className="text-gray-500">CEO, Acme Inc</div>
                            </cite>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

