package com.example.demo.repository;

import com.example.demo.model.TravelPackage;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    List<TravelPackage> findByGuide(User guide);
}
