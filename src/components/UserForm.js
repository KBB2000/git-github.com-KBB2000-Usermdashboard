import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const UserForm = ({ user, onClose, onSave, isAdding }) => {
  const [formData, setFormData] = useState({ ...user });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return; 
    setSaving(true);
    await onSave(formData); 
    setSaving(false);
    toast.success("User successfully created!"); 
    onClose(); 
  };

  

  return (
    <div className="user-form-backdrop">
      <div className="user-form">
        <h2>{isAdding ? "Add User" : "Edit User"}</h2>
        <div className="form-field">
          <label>First Name:</label>
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <span className="error">{errors.firstname}</span>}
        </div>
        <div className="form-field">
          <label>Last Name:</label>
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          {errors.lastname && <span className="error">{errors.lastname}</span>}
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label>Department:</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
          {errors.department && <span className="error">{errors.department}</span>}
        </div>
        <div className="user-form-actions">
          <button className="cancel-btn" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
