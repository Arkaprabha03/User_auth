// import React, { useEffect, useState } from "react";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState("");

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/users");
//       const data = await response.json();
//       setUsers(data);
//     } catch {
//       setMessage("Error fetching users");
//     }
//   };

//   const deleteUsers = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/api/auth/users/${id}`, {
//         method: "DELETE",
//       });
//       setMessage("User deleted successfully");
//       fetchUsers();
//     } catch {
//       setMessage("Failed to delete user");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Users</h2>

//       {message && (
//         <div className="mb-4 p-4 text-center bg-yellow-100 text-yellow-800 rounded-lg">
//           {message}
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.map((user, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
//           >
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-bold">Name:</span> {user.name}
//             </p>
//             <p className="text-gray-600">
//               <span className="font-bold">Email:</span> {user.email}
//             </p>
//             <button
//               onClick={() => deleteUsers(user._id)}
//               className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;

import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editUser, setEditUser] = useState(null); // To track the user being edited
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/users");
      const data = await response.json();
      setUsers(data);
    } catch {
      setMessage("Error fetching users");
    }
  };

  // Delete user
  const deleteUsers = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: "DELETE",
      });
      setMessage("User deleted successfully");
      fetchUsers();
    } catch {
      setMessage("Failed to delete user");
    }
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${editUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("User updated successfully");
        setEditUser(null);
        fetchUsers();
      } else {
        setMessage("Failed to update user");
      }
    } catch {
      setMessage("An error occurred during update");
    }
  };

  // Open edit modal and set initial values
  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, password: "" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Users</h2>

      {message && (
        <div className="mb-4 p-4 text-center bg-yellow-100 text-yellow-800 rounded-lg">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
          >
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold">Name:</span> {user.name}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openEditModal(user)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUsers(user._id)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Edit User</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
