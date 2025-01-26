import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const UserCard = ({ user, images = [], onEdit, onDelete }) => {
  const randomImage =
    images.length > 0
      ? images[Math.floor(Math.random() * images.length)]
      : "https://via.placeholder.com/150"; 

  return (
    <div className="user-card" onClick={onEdit}>
      <div
        className="delete-icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FaTrashAlt />
      </div>
      <img src={randomImage} alt="User Avatar" className="user-avatar" />
      <h3>{`${user.firstname} ${user.lastname}`}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
