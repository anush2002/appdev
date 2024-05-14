import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const BlogChart = () => {
  const [blogData, setBlogData] = useState([]);
  const [timeType, setTimeType] = useState(5); // Default value, you can change it as needed

  // Define fetchData function
  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7209l/api/Blog/AllBlogs?timeType=${timeType}`);
      const data = await response.json();
      setBlogData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeType]);

  useEffect(() => {
    if (blogData.length > 0) {
      createChart();
    }
  }, [blogData]); // Run createChart when blogData changes

  const createChart = () => {
    const likes = blogData.map(blog => blog.totalLikes);
    const dislikes = blogData.map(blog => blog.totalDislikes);
    const comments = blogData.map(blog => blog.totalComments);
    const titles = blogData.map(blog => blog.title);

    const ctx = document.getElementById('blogChart');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: titles,
          datasets: [
            {
              label: 'Likes',
              data: likes,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Dislikes',
              data: dislikes,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Comments',
              data: comments,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div>
      <canvas id="blogChart" width="400" height="400"></canvas>
    </div>
  );
};

export default BlogChart;
