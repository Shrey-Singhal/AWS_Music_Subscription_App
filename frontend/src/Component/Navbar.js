import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Navbar = () => {
    return (
        <nav className="bg-custom-color text-white p-4 border-b border-white border-opacity-30">
            <div className="container px-14 flex justify-between items-center">
                <div className="text-lg font-semibold">
                    <Link to="/mainpage" className="hover:text-gray-300">Music Subscription App</Link>
                </div>
                <div className="md:flex space-x-4">
                    <Link to="/">
                        <button className="hover:text-gray-300">Login</button>
                    </Link>
                    <Link to="/mainpage">
                        <button className="hover:text-gray-300">Query Area</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;