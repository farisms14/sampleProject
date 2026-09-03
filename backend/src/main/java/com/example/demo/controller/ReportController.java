package com.example.demo.controller;

import com.example.demo.model.Trip;
import com.example.demo.repository.TripRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reports")
@PreAuthorize("hasRole('ADMIN')")
public class ReportController {
    @Autowired
    TripRepository tripRepository;
    
    @Autowired
    UserRepository userRepository;

    @GetMapping("/trips")
    public List<Trip> getTripReports() {
        return tripRepository.findAll();
    }

    @GetMapping("/analytics")
    public Map<String, Object> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", userRepository.count());
        analytics.put("totalTrips", tripRepository.count());
        // Add more analytics as needed
        return analytics;
    }
}
