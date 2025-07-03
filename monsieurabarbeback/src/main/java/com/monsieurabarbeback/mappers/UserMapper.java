package com.monsieurabarbeback.mappers;


import com.monsieurabarbeback.controllers.dto.UserDTO;
import com.monsieurabarbeback.entities.User;

public class UserMapper {

    public static UserDTO toDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole()
        );
    }
}
