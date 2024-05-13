import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthenticated(true);
        try {
          const profileResponse = await axios.get('https://localhost:7209/api/Auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const roles = profileResponse.data.role;
          if (roles.includes('admin')) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Handle error
        }
      } else {
        setAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-darkcyan p-4 flex justify-between items-center navbar">
      <div className="flex items-center">
        <Link to="/" className="text-white mr-4">Bislerium Blog</Link>
        {authenticated && !isAdmin && <Link to="/HomePage" className="text-white mr-4">Home</Link>}
        {authenticated && !isAdmin && <Link to="/BlogPage" className="text-white mr-4">Blogs</Link>}
      </div>
      <div className="flex items-center">
        {authenticated ? (
          <>
            <Link to="/profile" className="text-white mr-4">Profile</Link>
            <button onClick={handleLogout} className="text-white mr-4">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/signup" className="text-white mr-4">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
