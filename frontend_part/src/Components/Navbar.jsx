import React from 'react';
import './Navbar.css';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href = "/">
                <span className=" text-white ">Password</span><span className="text-blue-200 brand-normal">Manager</span>

                </a>
                
            </div>
            <div className="flex items-end justify-end px-3">
                <ul className="navbar-links">
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
