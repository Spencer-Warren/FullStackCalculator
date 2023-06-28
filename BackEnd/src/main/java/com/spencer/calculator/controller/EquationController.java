package com.spencer.calculator.controller;

import com.spencer.calculator.entity.Equation;
import com.spencer.calculator.service.EquationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/equation")
public class EquationController {
    @Autowired
    private EquationService service;

    @PutMapping("")
    public Equation saveEquation(@RequestBody Equation equation) {
        return service.newEquation(equation);
    }

    @PostMapping("")
    public Equation updateEquation(@RequestBody Equation equation) {
        return service.updateEquation(equation);
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteEquation(@RequestBody Equation equation) {
        return service.deleteEquation(equation);
    }

    @GetMapping("/{userID}")
    public List<Equation> getAllUserEquations(@PathVariable int userID) {
        return service.getAllEquations(userID);
    }
}
