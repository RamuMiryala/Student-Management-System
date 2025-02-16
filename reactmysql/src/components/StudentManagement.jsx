import React, { useEffect, useState } from "react";
import { getAllStudents } from "../services/api";
import SearchStudent from "./SearchStudent";
import StudentList from "./StudentList";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
      setFilteredStudents(response.data); // Ensure filtered list is updated
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div>
      <h1>Student Management</h1>
      {/* Pass students and setFilteredStudents to SearchStudent */}
      <SearchStudent students={students} setFilteredStudents={setFilteredStudents} />
      {/* Pass filteredStudents to StudentList */}
      <StudentList students={filteredStudents} fetchStudents={fetchStudents} />
    </div>
  );
};

export default StudentManagement;
