package com.gabrielcireap.stackOverflow.dto;

import com.gabrielcireap.stackOverflow.entity.User;
import lombok.Data;

@Data
public class UserShowDTO {

    private Integer id;
    private String username;
    private Integer score;
    private Boolean isAdmin;
    private Boolean isBanned;

    public static UserShowDTO ofEntity(User user) {
        System.out.println(user);
        UserShowDTO userDTO = new UserShowDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setScore(user.getScore());
        userDTO.setIsAdmin(user.getIsAdmin());
        userDTO.setIsBanned(user.getIsBanned());

        return userDTO;
    }
}
