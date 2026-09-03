package com.example.demo.service;

import com.example.demo.model.Route;
import com.example.demo.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteService {
    @Autowired
    RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public List<Route> optimizeRoute(String source, String destination, String criteria) {
        List<Route> allRoutes = routeRepository.findAll();
        // Simple mock optimization logic based on criteria (distance, time, budget)
        return allRoutes.stream()
                .filter(r -> r.getSource().equalsIgnoreCase(source) && r.getDestination().equalsIgnoreCase(destination))
                .sorted((r1, r2) -> {
                    if ("time".equalsIgnoreCase(criteria)) {
                        return r1.getEstimatedTravelTime().compareTo(r2.getEstimatedTravelTime());
                    } else if ("distance".equalsIgnoreCase(criteria)) {
                        return r1.getDistance().compareTo(r2.getDistance());
                    }
                    return 0;
                })
                .collect(Collectors.toList());
    }

    public Route createRoute(Route route) {
        return routeRepository.save(route);
    }
}
