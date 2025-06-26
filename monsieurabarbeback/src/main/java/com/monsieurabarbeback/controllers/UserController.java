package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.controllers.dto.UserDTO;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.mappers.UserMapper;
import com.monsieurabarbeback.services.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(UserMapper.toDto(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
}
