import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Userside = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchPopularBlogs = async () => {
      try {
        const response = await axios.get('/api/popular-blogs');
        setPopularBlogs(response.data);
      } catch (error) {
        console.error('Error fetching popular blogs:', error);
      }
    };

    fetchPopularBlogs();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setIsLoggedIn(false);
  //   navigate('/login');
  // };

  return (
    <>
      <section className="hero-section relative">
        <img src="bb.png" alt="Hero" className="hero-img w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-start items-start text-left p-20 mt-40">
          <h1 className="text-4xl font-bold text-black">Welcome to Our Blog</h1>
          <p className="text-lg text-black mt-4">Explore amazing content and discover new ideas</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded mt-8">Get Started</button>

        </div>
      </section>

      <section className="popular-blogs-section">
        <h2 className="text-2xl font-bold mb-4 text-center mt-10">Popular Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularBlogs.map(blog => (
            <div key={blog.id} className="bg-white p-4 shadow-md rounded-md">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="advertisement-section">
        <div className="advertisement mt-10">
          <p>i am user</p>
        </div>
      </section>
    </>
  );
};

export default Userside;
