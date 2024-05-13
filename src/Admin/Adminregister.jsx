import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://localhost:7209/api/Auth/register/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store token in localStorage after login
          }
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Authentication failed:', error);
        // Handle authentication failure, redirect to login page, etc.
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7209/api/Auth/register/admin', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in request headers
        }
      });
      if (response.status === 200) {
        setShowModal(true);
      } else {
        // Handle error cases
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Sidebar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-8 text-center">User Registration</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="First Name" />
          </div>
          <div className="mb-4">
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Last Name" />
          </div>
          <div className="mb-4">
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
          </div>
          <div className="mb-4">
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Password" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>

        {/* Modal */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <button className="absolute top-4 right-4 text-dark" onClick={closeModal}>Close</button>
              <h2 className="text-2xl font-semibold mb-2">User as admin Added Successfully!</h2>
              <p className="text-gray-600">Thank you for registering.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
