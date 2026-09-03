package com.example.demo.service;

import com.example.demo.model.Destination;
import com.example.demo.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DestinationService {
    @Autowired
    DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Destination getDestinationById(Long id) {
        return destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));
    }

    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    public Destination updateDestination(Long id, Destination details) {
        Destination destination = getDestinationById(id);
        destination.setName(details.getName());
        destination.setCity(details.getCity());
        destination.setCountry(details.getCountry());
        destination.setDescription(details.getDescription());
        destination.setEstimatedCost(details.getEstimatedCost());
        destination.setLatitude(details.getLatitude());
        destination.setLongitude(details.getLongitude());
        return destinationRepository.save(destination);
    }

    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }
}
