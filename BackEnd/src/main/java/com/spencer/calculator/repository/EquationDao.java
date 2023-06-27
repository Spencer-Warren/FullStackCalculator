package com.spencer.calculator.repository;

import com.spencer.calculator.entity.Equation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquationDao extends JpaRepository<Equation, Integer> {
    @Query("SELECT * FROM Equation e WHERE userID=?1")
    List<Equation> getAllByUserID(int userID);
}
