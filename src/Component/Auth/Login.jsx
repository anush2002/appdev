import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7209/login', { email, password });
      const token = response.data.accessToken;
      localStorage.setItem('token', token);

      // After successful login, fetch user profile to determine role
      const profileResponse = await axios.get('https://localhost:7209/api/Auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      let role;
      if (Array.isArray(profileResponse.data.role) && profileResponse.data.role.length > 0) {
        // Extract the role from the array
        role = profileResponse.data.role[0];
      } else {
        // If role is not in the expected format, handle the error
        console.error('Invalid role format:', profileResponse.data.role);
        setShowModal(true);
        return;
      }

      // Redirect based on the role
      if (role === 'admin') {
        navigate('/Admin');
      } else if (role === 'user') {
        navigate('/Userside');
      } else {
        // Handle other roles
        console.error('Unsupported role:', role);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex">
      <div className="w-1/2 flex justify-center items-center mt-20">
        <img src="background image.webp" alt="Image" className="w-3/4" />
      </div>
      <div className="w-1/2 flex justify-center items-center mt-2">
        <div className="form-container">
          <h2 className="text-2xl mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="w-3/4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 px-4 mb-4 border-b-2 border-gray-400 outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-2 px-4 mb-4 border-b-2 border-gray-400 outline-none" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50" onClick={closeModal}>
          <div className="modal-content bg-white p-8 rounded" onClick={(e) => e.stopPropagation()}>
            <span className="close text-gray-600 absolute top-0 right-0 cursor-pointer text-2xl" onClick={closeModal}>&times;</span>
            <p className="text-gray-800">Login failed. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
