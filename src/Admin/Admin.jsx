import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import BlogChart from './Chart';

export default function Dashboard() {
  const [topTenUsers, setTopTenUsers] = useState([]);
  const [timeType, setTimeType] = useState(5); // Default value, you can change it as needed
  const [topTenBlogs, setTopTenBlogs] = useState([]);

  useEffect(() => {
    fetchTopTenUsers();
  }, [timeType]);

  useEffect(() => {
    fetchTopTenBlogs();
  }, [timeType]);

  const fetchTopTenUsers = () => {
    axios.get(`https://localhost:7209/api/Blog/TopTenAuthors?timeType=${timeType}`)
      .then(response => {
        setTopTenUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching top ten users:', error);
      });
  };

  const fetchTopTenBlogs = () => {
    axios.get(`https://localhost:7209l/api/Blog/TopTenBlogs?timeType=${timeType}`)
      .then(response => {
        setTopTenBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching top ten blogs:', error);
      });
  };

  const handleTimeTypeChange = (newTimeType) => {
    setTimeType(newTimeType);
  };

  return (
    <>
      <Sidebar />
      <BlogChart />
      <div className="container mx-auto px-4 py-8" style={{ marginLeft: "300px", marginTop:"-400px" }}>
        <h2 className="text-2xl font-bold mb-4">Top 10 Users</h2>
        <div className="mb-4">
          <label htmlFor="timeType" className="mr-2">Select Time Type:</label>
          <select id="timeType" className="p-2" value={timeType} onChange={e => handleTimeTypeChange(e.target.value)}>
            <option value={1}>Last 1 day</option>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6" style={{ width: "200px", marginLeft: "0px" }}>
          <h3 className="text-lg font-semibold mb-2">Top 10 Users</h3>
          <ul className="list-disc list-inside">
            {topTenUsers.map(user => (
              <li key={user.userId}>
                {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : ''}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8" style={{ marginLeft: "600px",  marginTop:"-320px"}}>
        <h2 className="text-2xl font-bold mb-4">Top 10 Blogs</h2>
        <div className="mb-4">
          <label htmlFor="timeType" className="mr-2">Select Time Type:</label>
          <select id="timeType" className="p-2" value={timeType} onChange={e => handleTimeTypeChange(e.target.value)}>
            <option value={1}>Last 1 day</option>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6" style={{ width: "200px", marginLeft: "0px" }}>
          <h3 className="text-lg font-semibold mb-2">Top 10 Blogs</h3>
          <ul className="list-disc list-inside">
            {topTenBlogs.map(blog => (
              <li key={blog.blogId}>
                <strong>{blog.title}</strong> by {blog.author}
              </li>
            ))}
          </ul>
      
        </div>
      </div>




    </>
  );
}
