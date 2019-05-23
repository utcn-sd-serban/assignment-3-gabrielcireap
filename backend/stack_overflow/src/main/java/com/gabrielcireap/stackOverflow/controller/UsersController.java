package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.dto.UserRegisterDTO;
import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.event.BaseEvent;
import com.gabrielcireap.stackOverflow.exception.BannedUserException;
import com.gabrielcireap.stackOverflow.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UsersController {

    private final UserManagementService userManagementService;
    private final PasswordEncoder passwordEncoder;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/users")
    public List<UserShowDTO> readAll() {
        return userManagementService.listUsers();
    }

    @PostMapping("/users")
    public UserShowDTO create(@RequestBody UserRegisterDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userManagementService.save(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail());
    }

    @PutMapping("/users/ban/{id}")
    public UserShowDTO ban(@PathVariable int id) {
        return userManagementService.ban(id);
    }

    @GetMapping("/login")
    public UserShowDTO login() {
        User user = userManagementService.getLoggedUser();
        if (user.getIsBanned() == true)
            throw new BannedUserException();
        else{
            return UserShowDTO.ofEntity(user);
        }
    }

    @EventListener(BaseEvent.class)
    public void handleBaseEvent(BaseEvent event) {
        messagingTemplate.convertAndSend("/topic/events", event);
    }
}
