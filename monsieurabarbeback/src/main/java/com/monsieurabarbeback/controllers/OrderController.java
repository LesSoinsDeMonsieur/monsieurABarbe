package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.entities.Order;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.services.OrderService;
import com.monsieurabarbeback.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final UserService userService; // Ajout du UserService

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(orderService.getOrdersByUser(user.get()));
        }
        return ResponseEntity.notFound().build();
    }
}
