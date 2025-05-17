package com.alumni.alumninet.repository;

import com.alumni.alumninet.entity.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlumniRepository extends JpaRepository<Alumni, String> {
}
