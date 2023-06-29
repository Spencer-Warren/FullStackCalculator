package com.spencer.calculator.service;

import com.spencer.calculator.entity.Equation;
import com.spencer.calculator.repository.EquationDao;
import com.spencer.calculator.utility.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquationServiceImpl implements EquationService{

    @Autowired
    private EquationDao dao;

    @Override
    public Equation newEquation(Equation equation) {
        System.out.println(equation);
        return dao.save(equation);
    }

    @Override
    public Equation updateEquation(Equation equation) {
        Equation oldEquation = dao.findById(equation.getEquationID()).get();
        oldEquation.setEquationString(equation.getEquationString());
        oldEquation.setSolution(equation.getSolution());
        dao.save(oldEquation);
        return oldEquation;
    }

    @Override
    public ResponseEntity<String> deleteEquation(Equation equation) {
        int id = equation.getEquationID();
        if (!dao.existsById(id)) {
            return Response.of("Did not find equation with ID: " + id);
        }
        dao.deleteById(id);
        return Response.of("Deleted equation with ID: " + id);
    }

    @Override
    public List<Equation> getAllEquations(int userID) {
        return dao.getAllByUserID(userID);
    }
}
