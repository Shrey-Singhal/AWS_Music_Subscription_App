import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the homepage after logging out
    };

    return (
        <nav className="bg-custom-color text-white p-4 border-b border-white border-opacity-30">
            <div className="container px-14 flex justify-between items-center">
                <div className="text-lg font-semibold">
                    <Link to={user ? "/mainpage" : "/"} className="hover:text-gray-300">Music Subscription App</Link>
                </div>
                <div className="md:flex space-x-4">
                    {/*<Link to={user ? "/mainpage" : "/"}>*/}
                    {/*    <button className="hover:text-gray-300">Query Area</button>*/}
                    {/*</Link>*/}
                    <Link to="/query">
                        <button className="hover:text-gray-300">Query Area</button>
                    </Link>

                    {!user && (
                        <Link to="/">
                            <button className="hover:text-gray-300">Login</button>
                        </Link>
                    )}

                    {user && (
                        <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
