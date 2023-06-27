package com.spencer.calculator.service;

import com.spencer.calculator.entity.Equation;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EquationService {
    Equation newEquation(Equation equation);
    Equation updateEquation(Equation equation);
    ResponseEntity<String> deleteEquation(Equation equation);
    List<Equation> getAllEquations(int userID);
}
