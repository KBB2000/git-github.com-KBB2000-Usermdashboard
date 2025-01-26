import React from "react";
import UserList from "./components/UserList"
import "./App.css"

const App = () => {
  return (
    <div>
      <h1 className="main-heading">User Management</h1>
      <UserList />
    </div>
  );
};

export default App;
