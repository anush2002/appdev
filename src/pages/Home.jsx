import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Component/Footer';
import StaticBlogs from './Staticblog';

const HomePage = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);

  useEffect(() => {
    // Fetch popular blogs data from an endpoint
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

  return (
  <>
    <div>
     <section className="hero-section relative">
        {/* Hero image */}
        <img src="bb.png" alt="Hero" className="hero-img w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-start items-start text-left p-20 mt-40">
          <h1 className="text-4xl font-bold text-black">Welcome to Our Blog</h1>
          <p className="text-lg text-black mt-4">Explore amazing content and discover new ideas</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded mt-8">Get Started</button>
        </div>
      </section>

      {/* <section className="popular-blogs-section">
        <h2 className=" text-2xl font-bold mb-4 text-center mt-10">Popular Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularBlogs.map(blog => (
            <div key={blog.id} className="bg-white p-4 shadow-md rounded-md">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.summary}</p>
             
            </div>
          ))}
        </div>
      </section> */}

<section class="popular-blogs-section">
  <h2 class="text-2xl font-bold mb-4 text-center mt-10">Popular Blogs</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="bg-white p-4 shadow-md rounded-md">
      <img src="logo192.png" alt="Blog image" class="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 class="text-lg font-semibold mb-2">Blog Title 1</h3>
      <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in orci a ligula euismod rhoncus.</p>
    </div>
    <div class="bg-white p-4 shadow-md rounded-md">
      <img src="blog2.jpg" alt="Blog Title" class="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 class="text-lg font-semibold mb-2">Blog Title 2</h3>
      <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in orci a ligula euismod rhoncus.</p>
    </div>
    <div class="bg-white p-4 shadow-md rounded-md">
      <img src="blog3.jpg" alt="Blog Title" class="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 class="text-lg font-semibold mb-2">Blog Title 3</h3>
      <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in orci a ligula euismod rhoncus.</p>
    </div>

  </div>
</section>


      <section className="advertisement-section">
        {/* Advertisement content */}
        <div className="advertisement mt-10">
          {/* <img src="advertisement-image.jpg" alt="Advertisement" className="w-full" /> */}
          <p className='text-center adv'>Read Blogs Get 20% Discount on Bislerium Cafe</p>
        </div>
      </section>
    
    </div>
   

    </>
  );
};

export default HomePage;
