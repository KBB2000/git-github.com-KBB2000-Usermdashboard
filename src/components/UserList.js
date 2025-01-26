import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "../App.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => ({
          id: user.id,
          firstname: user.name.split(" ")[0],
          lastname: user.name.split(" ")[1] || "",
          department: user.company.name,
          email: user.email, 
        }));
        setUsers(formattedData);
        setTotalPages(Math.ceil(formattedData.length / pageSize));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [pageSize]);

  const handleAddUser = () => {
    setIsAdding(true);
    setSelectedUser({ firstname: "", lastname: "", department: "", email: "" });
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setIsAdding(false);
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = (userId) => {
    if (toast.warn("User successfully Deleted!")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      // toast.success("User successfully created!"); 
      const updatedTotalPages = Math.ceil(
        (users.length - 1) / pageSize
      );
      if (page > updatedTotalPages) {
        setPage(updatedTotalPages); 
      }
      setTotalPages(updatedTotalPages);
    }
  };

  const handleSaveUser = (savedUser) => {
    if (isAdding) {
      const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
      const newUser = { ...savedUser, id: newId };
      setUsers((prev) => [...prev, newUser]);
      setTotalPages(Math.ceil((users.length + 1) / pageSize));
    } else {
      setUsers((prev) =>
        prev.map((user) => (user.id === savedUser.id ? savedUser : user))
      );
    }
    setShowForm(false);
  };

  const startIndex = (page - 1) * pageSize;
  const currentPageUsers = users.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <button className="add-user-btn" onClick={handleAddUser}>
        Add User
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td> {/* Display email */}
              <td>{user.department}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
      {showForm && (
        <UserForm
          user={selectedUser}
          isAdding={isAdding}
          onClose={() => setShowForm(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserList;
