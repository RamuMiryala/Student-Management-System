package com.digital.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digital.model.Student;

public interface StudentRepo extends JpaRepository<Student, Long> {
	
    List<Student> findTop5ByOrderByCreatedAtDesc();

}
