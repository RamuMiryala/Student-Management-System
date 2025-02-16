import React, { useState } from "react";
import { createStudent } from "../services/api";
import "../scss/AddStudentform.scss";

const AddStudentForm = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: "",
    userName: "",
    email:"",
    branch: "",
    nmbr: "",
    city: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for name, branch, and city (only letters and spaces)
    if (["name", "branch", "city"].includes(name)) {
      if (!/^[a-zA-Z\s]*$/.test(value)) return; // Allow only letters and spaces
    }

    // Validation for username (allow letters, numbers, and special characters)
    if (name === "userName") {
      if (!/^[a-zA-Z0-9_.@-]*$/.test(value)) return; 
      // Allows letters, numbers, and special characters (_.@-)
    }

    // Validation for number field (allow only digits)
    if (name === "nmbr") {
      if (!/^\d*$/.test(value)) return; // Only allow numbers
    }

    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(student);
      setStudent({ name: "", userName: "", email:"", branch: "", nmbr: "", city: "" });
      if (onStudentAdded) onStudentAdded(); // Refresh the list
    } catch (err) {
      setError("Failed to add student. Try again!");
      console.error("Error adding student:", err);
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add New Student</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={student.userName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={student.branch}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nmbr"
          placeholder="Number"
          value={student.nmbr}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={student.city}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
