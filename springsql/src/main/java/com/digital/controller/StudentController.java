package com.digital.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.digital.model.Student;
import com.digital.repo.StudentRepo;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepo studentRepository;

    @GetMapping("/api")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable("id") Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable("id") Long id, @RequestBody Student studentDetails) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student != null) {
            student.setUserName(studentDetails.getUserName());
            student.setEmail(studentDetails.getEmail()); // Ensure email is set
            student.setName(studentDetails.getName());
            student.setBranch(studentDetails.getBranch());
            student.setNmbr(studentDetails.getNmbr());
            student.setCity(studentDetails.getCity());
            return studentRepository.save(student);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable("id") Long id) {
        if (!studentRepository.existsById(id)) {
            return "Student not found";
        }
        studentRepository.deleteById(id);
        return "Student deleted successfully";
    }

    // ✅ New API to get recent student activities
    @GetMapping("/recent-activities")
    public List<String> getRecentActivities() {
        return studentRepository.findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(student -> "✅ " + student.getName() + " added to " + student.getBranch())
                .collect(Collectors.toList());
    }
}
