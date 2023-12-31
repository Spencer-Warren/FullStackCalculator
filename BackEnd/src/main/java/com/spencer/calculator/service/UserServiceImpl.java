package com.spencer.calculator.service;

import com.spencer.calculator.entity.User;
import com.spencer.calculator.repository.UserDao;
import com.spencer.calculator.utility.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao dao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        user.setUserPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserRole("ROLE_USER");
        return dao.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return dao.findByUsername(username);
    }

    @Override
    public User findByID(int userID) {
        return dao.findById(userID).get();
    }

    @Override
    public ResponseEntity<String> updateUser(User user) {
        dao.findById(user.getUserID())
                .ifPresent(u -> {
            u.setUsername(user.getUsername());
            u.setUserEmail(user.getUserEmail());
            dao.save(u);
        });
        return Response.of("Updated User with ID:" + user.getUserID());
    }

    @Override
    public ResponseEntity<String> deleteUser(User user) {
        if (dao.existsById(user.getUserID())) {
            dao.deleteById(user.getUserID());
            return Response.of("Deleted User with ID:" + user.getUserID());
        }
        else {
            return Response.of("User with ID:" + user.getUserID() + " does not exist.", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<User> login(User user) {
        String password = user.getUserPassword();
        User u = dao.findByUsername(user.getUsername());
        if (u != null && passwordEncoder.matches(password, u.getUserPassword())) {
            return Response.of(u);
        }
        return Response.of(new User(), HttpStatus.UNAUTHORIZED);
    }
}
