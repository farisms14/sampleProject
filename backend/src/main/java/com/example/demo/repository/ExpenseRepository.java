package com.example.demo.repository;

import com.example.demo.model.Expense;
import com.example.demo.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByTrip(Trip trip);
}
