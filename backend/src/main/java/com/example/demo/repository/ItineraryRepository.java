package com.example.demo.repository;

import com.example.demo.model.Itinerary;
import com.example.demo.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    List<Itinerary> findByTrip(Trip trip);
}
