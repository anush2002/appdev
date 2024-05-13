import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://localhost:7209/api/Blog/AllBlogs');
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-8 text-center">All Blogs</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap justify-between">
            {blogs.map(blog => (
              <div key={blog.id} className="w-full sm:w-1/2  lg:w-1/1 px-2 mb-4" style={{marginLeft:"400px"}}>
                <div className="bg-white rounded-md shadow-md">
                  <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-t-md" />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{blog.title}</h2>
                    <p>{blog.content}</p>
                    {/* You can display more information about each blog as needed */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBlogs;
