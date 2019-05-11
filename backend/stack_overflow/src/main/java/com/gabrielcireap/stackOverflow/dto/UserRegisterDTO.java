package com.gabrielcireap.stackOverflow.dto;

import com.gabrielcireap.stackOverflow.entity.User;
import lombok.Data;

@Data
public class UserRegisterDTO {

    private String username;
    private String password;
    private String email;
    private Integer score;
    private Boolean isAdmin;
    private Boolean isBanned;

    public static UserRegisterDTO ofEntity(User user){
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
        userRegisterDTO.setUsername(user.getUsername());
        userRegisterDTO.setPassword(user.getPassword());
        userRegisterDTO.setEmail(user.getEmail());
        userRegisterDTO.setScore(user.getScore());
        userRegisterDTO.setIsAdmin(user.getIsAdmin());
        userRegisterDTO.setIsBanned(user.getIsBanned());
        return userRegisterDTO;
    }
}
