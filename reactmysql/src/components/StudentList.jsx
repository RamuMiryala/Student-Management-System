import React, { useEffect, useState } from "react";
import { getAllStudents, deleteStudent, updateStudent } from "../services/api";
import SearchStudent from "./SearchStudent";
import "../scss/StudentList.scss";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setFilteredStudents(students); // Ensure filteredStudents resets when students change
  }, [students]);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudentId(student.id);
    setEditedStudent({ ...student, email: student.email || "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await updateStudent(editedStudent.id, editedStudent);
      fetchStudents();
      setEditingStudentId(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="student-list">
      <h2>Student List</h2>
      <SearchStudent students={students} setFilteredStudents={setFilteredStudents} />

      <ul className="student-card">
        {filteredStudents.map((student) => (
          <li key={student.id} className="student-item">
            <div onClick={() => setExpandedStudentId(expandedStudentId === student.id ? null : student.id)} className="student-header">
              {student.name} - {student.city}
            </div>

            {expandedStudentId === student.id && (
              <div className="student-details open">
                {editingStudentId === student.id ? (
                  <div className="edit-form">
                    <input type="text" name="userName" value={editedStudent.userName} onChange={handleInputChange} />
                    <input type="text" name="name" value={editedStudent.name} onChange={handleInputChange} />
                    <input type="email" name="email" value={editedStudent.email} onChange={handleInputChange} />
                    <input type="text" name="branch" value={editedStudent.branch} onChange={handleInputChange} />
                    <input type="text" name="nmbr" value={editedStudent.nmbr} onChange={handleInputChange} />
                    <input type="text" name="city" value={editedStudent.city} onChange={handleInputChange} />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingStudentId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p><strong>Username:</strong> {student.userName}</p>
                    <p><strong>Email:</strong> {student.email || "N/A"}</p>
                    <p><strong>Branch:</strong> {student.branch}</p>
                    <p><strong>Number:</strong> {student.nmbr}</p>
                    <p><strong>City:</strong> {student.city}</p>
                    <button onClick={() => handleEditClick(student)}>Edit</button>
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
