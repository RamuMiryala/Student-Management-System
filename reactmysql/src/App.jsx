import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";
import Home from "./components/Home"
import SearchStudent from "./components/SearchStudent";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchStudent />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudentForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
