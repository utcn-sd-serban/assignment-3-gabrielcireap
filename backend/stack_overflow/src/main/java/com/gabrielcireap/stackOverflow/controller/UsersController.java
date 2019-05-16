package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.dto.UserRegisterDTO;
import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import com.gabrielcireap.stackOverflow.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UsersController {

    private final UserManagementService userManagementService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<UserShowDTO> readAll() {
        return userManagementService.listUsers();
    }

    @PostMapping("/users")
    public UserShowDTO create(@RequestBody UserRegisterDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userManagementService.save(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail());
    }

    @GetMapping("/users/ban/{id}")
    public UserShowDTO ban(@PathVariable int id){
        return userManagementService.ban(id);
    }

    @GetMapping("/login")
    public UserShowDTO login(){
        return UserShowDTO.ofEntity(userManagementService.getLoggedUser());
    }
}
