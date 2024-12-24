import React from 'react';
import { Link } from 'react-router-dom';

const MediumLandingPage: React.FC = () => {
    let token = localStorage.getItem('token');
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Header */}
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="text-3xl font-bold">Medium</div>
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="/blogs" className="hover:text-gray-600">Home</a></li>
                        {token ? (
                        <li><a href="/create" className="hover:text-gray-600">Write</a></li>
                        ): (
                            <li><a href="/signin" className="hover:text-gray-600">Sign In</a></li>
                            
                        )}
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl font-bold mb-6">Where good ideas find you</h1>
                <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
                    Read and share new perspectives on just about any topic. Everyone's welcome.
                </p>
                <Link to={"/blogs"} >
                <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300">
                    Get Started
                </button>
                </Link>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Why Medium?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Diverse Voices</h3>
                            <p className="text-gray-700">Read from a wide range of perspectives and topics.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Quality Content</h3>
                            <p className="text-gray-700">Discover stories, thinking, and expertise from writers on any topic.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Personalized Experience</h3>
                            <p className="text-gray-700">Tailor your reading experience to your interests.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="container mx-auto px-4 py-20">
                <blockquote className="text-2xl font-light italic text-center max-w-3xl mx-auto">
                    "Medium is an excellent platform for readers and writers alike. It's where I go to find fresh perspectives and share my own ideas."
                </blockquote>
                <p className="text-center mt-4 font-semibold">- Jane Doe, Writer & Entrepreneur</p>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-10">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600">&copy; 2023 Medium. All rights reserved.</p>
                    <div className="mt-4">
                        <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">Terms</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">Privacy</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">Help</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MediumLandingPage;

