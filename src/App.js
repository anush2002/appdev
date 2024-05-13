import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Signup from './Component/Auth/Signup';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import HomePage from './pages/Home';
import BlogPage from './pages/Blog';
import Admin from './Admin/Admin';
import Userside from './user/Userside';
import Sidebar from './Admin/Sidebar';
import AdminRegistration from './Admin/Adminregister';
import UserDetails from './Admin/Usercard';
import Dashboard from './Admin/Dashboard';
import ProtectedRoute from './Component/Auth/protectedroute';
import AdminBlogs from './Admin/AdminBlogs';
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Use PrivateRoute instead of Route for protected admin routes */}
            {/* <ProtectedRoute path="/Admin" element={<Admin />} /> */}
              <Route path="/Admin" element={<Admin />} />
            <Route path="/Userside" element={<Userside />} />
            <Route path="/Homepage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/BlogPage" element={<BlogPage />} />
            <Route path="/Sidebar" element={<Sidebar />} />
            <Route path="/Adminregister" element={<AdminRegistration />} />
            <Route path="/Usercard" element={<UserDetails />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/AdminBlogs" element={<AdminBlogs />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
