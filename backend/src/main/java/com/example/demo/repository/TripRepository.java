package com.example.demo.repository;

import com.example.demo.model.Trip;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByTraveler(User traveler);
}
