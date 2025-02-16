import React, { useState } from "react";
import "../scss/SearchStudent.scss";
import StudentList from "./StudentList";

const SearchStudent = ({ students, setFilteredStudents }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredStudents(students); // Reset student list when search is cleared
      return;
    }

    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(value) ||
      student.city.toLowerCase().includes(value) ||
      student.branch.toLowerCase().includes(value)
    );

    setFilteredStudents(filtered);
  };

  return (
    <div className="search-student">
      <label htmlFor="search-input">Find Student:</label>
      <input
        type="text"
        id="search-input"
        placeholder="Search by Name, City, or Branch..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchStudent;
