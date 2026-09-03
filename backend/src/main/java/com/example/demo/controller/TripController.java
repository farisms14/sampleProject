package com.example.demo.controller;

import com.example.demo.model.Trip;
import com.example.demo.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/trips")
public class TripController {
    @Autowired
    TripService tripService;

    @GetMapping
    @PreAuthorize("hasRole('TRAVELER') or hasRole('ADMIN')")
    public List<Trip> getAllTrips() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return tripService.getTripsByTraveler(username);
    }

    @PostMapping
    @PreAuthorize("hasRole('TRAVELER')")
    public Trip createTrip(@RequestBody Trip trip) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return tripService.createTrip(trip, username);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TRAVELER')")
    public Trip updateTrip(@PathVariable Long id, @RequestBody Trip trip) {
        return tripService.updateTrip(id, trip);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TRAVELER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.ok().build();
    }
}
