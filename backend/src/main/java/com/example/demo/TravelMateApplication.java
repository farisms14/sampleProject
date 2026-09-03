package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TravelMateApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelMateApplication.class, args);
		System.out.println("TravelMate Backend Started Successfully!");
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (!userRepository.existsByUsername("admin")) {
				User admin = new User("admin", "admin@travelmate.com", 
						passwordEncoder.encode("admin123"), 
						"Administrator", "1234567890", User.Role.ROLE_ADMIN);
				userRepository.save(admin);
				System.out.println("Admin user seeded successfully!");
			}
		};
	}

}
