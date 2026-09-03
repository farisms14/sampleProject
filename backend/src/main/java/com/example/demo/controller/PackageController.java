package com.example.demo.controller;

import com.example.demo.model.TravelPackage;
import com.example.demo.repository.TravelPackageRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/packages")
public class PackageController {
    @Autowired
    TravelPackageRepository packageRepository;
    
    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<TravelPackage> getAllPackages() {
        return packageRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('GUIDE')")
    public TravelPackage createPackage(@RequestBody TravelPackage travelPackage) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        travelPackage.setGuide(userRepository.findByUsername(username).get());
        return packageRepository.save(travelPackage);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('GUIDE')")
    public TravelPackage updatePackage(@PathVariable Long id, @RequestBody TravelPackage travelPackage) {
        TravelPackage pkg = packageRepository.findById(id).orElseThrow();
        pkg.setPackageName(travelPackage.getPackageName());
        pkg.setDescription(travelPackage.getDescription());
        pkg.setPrice(travelPackage.getPrice());
        return packageRepository.save(pkg);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('GUIDE') or hasRole('ADMIN')")
    public void deletePackage(@PathVariable Long id) {
        packageRepository.deleteById(id);
    }
}
