package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.controllers.dto.OrderCreationRequest;
import com.monsieurabarbeback.controllers.dto.OrderResponse;
import com.monsieurabarbeback.controllers.dto.OrderUpdateRequest;
import com.monsieurabarbeback.entities.Order;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.mappers.OrderMapper;
import com.monsieurabarbeback.services.OrderService;
import com.monsieurabarbeback.services.UserService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> {
                    List<OrderResponse> orders = orderService.getOrdersByUser(user);
                    return ResponseEntity.ok(orders);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> updateOrder(@PathVariable Long id, @RequestBody OrderUpdateRequest updateRequest) {
        try {
            Order updatedOrder = orderService.updateOrder(id, updateRequest);
            return ResponseEntity.ok(OrderMapper.toOrderResponse(updatedOrder));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderService.getOrderById(id).isPresent()) {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderCreationRequest orderRequest, Authentication authentication) {
        String username = authentication.getName();
        return orderService.createOrder(orderRequest, username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
