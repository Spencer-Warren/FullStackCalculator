package com.spencer.calculator.service;

import com.spencer.calculator.entity.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    User saveUser(User user);
    User findByUsername(String username);
    User findByID(int userID);
    ResponseEntity<String> updateUser(User user);
    ResponseEntity<String> deleteUser(User user);
    ResponseEntity<User> login(User user);

}
