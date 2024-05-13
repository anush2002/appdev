import React, { useState } from 'react';
import Sidebar from './Sidebar';

const UserDetails = () => {
  const [users, setUsers] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', role: 'User' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', role: 'Admin' },
    { id: 3, firstName: 'Tom', lastName: 'Jones', role: 'User' }
  ]);

  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-2 mb-4" style={{ width: "calc(100% - 250px)" }}>
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between w-full bg-white rounded-lg shadow-md p-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500">Role: {user.role}</p>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
