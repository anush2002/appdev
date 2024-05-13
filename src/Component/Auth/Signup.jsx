import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7209/api/Auth/register/user', {
        email,
        password,
        FirstName: firstname,
        LastName: lastname
      });
      // Redirect to login page upon successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 flex justify-center items-center mt-20">
        <img src="background image.webp" alt="Image" className="w-3/4" />
      </div>
      <div className="w-1/2 flex justify-center items-center mt-2">
        <div className="form-container">
          <h2 className="text-2xl mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="w-3/4">
            <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="w-full py-2 px-4 mb-4 border-b-2 border-gray-400 outline-none" />
            <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} className="w-full py-2 px-4 mb-4 border-b-2 border-gray-400 outline-none" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 px-4 mb-4 border-b-2 border-gray-400 outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-2 px-4 mb-4 border-b-2 border-gray-400 outline-none" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Sign Up</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
