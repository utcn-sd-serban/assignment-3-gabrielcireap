package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.dto.UserRegisterDTO;
import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import com.gabrielcireap.stackOverflow.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/")
    public UserShowDTO create(@RequestBody UserRegisterDTO userDTO) {
        return userManagementService.save(userDTO);
    }

    @PostMapping("/login")
    public UserShowDTO login(@RequestBody UserRegisterDTO userRegisterDTO) {
        userRegisterDTO.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        return userManagementService.login(userRegisterDTO);
    }

    /*@PostMapping("/login")
    public UserShowDTO register(@RequestBody UserRegisterDTO userRegisterDTO) {
        return userManagementService.save(userRegisterDTO);
    }
    */
}
