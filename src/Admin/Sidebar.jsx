import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiBarChart2, FiBook, FiUsers } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
    <div className="bg-gray-900 text-white h-full w-64 flex flex-col fixed">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <ul className="flex-1">
        <li className={`p-4 ${location.pathname === 'Dashboard' ? 'bg-gray-800' : ''}`}>
          <Link to="/Dashboard" className="flex items-center">
            <FiHome className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className={`p-4 ${location.pathname === '/Register' ? 'bg-gray-800' : ''}`}>
          <Link to="/Adminregister" className="flex items-center">
            <FiUser className="mr-2" />
            Register
          </Link>
        </li>
        <li className={`p-4 ${location.pathname === '/Statistics' ? 'bg-gray-800' : ''}`}>
          <Link to="/Statistics" className="flex items-center">
            <FiBarChart2 className="mr-2" />
            Statistics
          </Link>
        </li>
        <li className={`p-4 ${location.pathname === '/Blog' ? 'bg-gray-800' : ''}`}>
          <Link to="/AdminBlogs" className="flex items-center">
            <FiBook className="mr-2" />
            Blog
          </Link>
        </li>
        <li className={`p-4 ${location.pathname === '/Users' ? 'bg-gray-800' : ''}`}>
          <Link to="/Users" className="flex items-center">
            <FiUsers className="mr-2" />
            Users
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
