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
    private final UserService userService;

    // 🔍 Récupérer toutes les commandes
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // 🔍 Récupérer une commande par ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 🔍 Récupérer les commandes d'un utilisateur
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(orderService.getOrdersByUser(user.get()));
        }
        return ResponseEntity.notFound().build();
    }

    // ➕ Créer une commande
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    // ✏️ Modifier une commande
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Optional<Order> order = orderService.getOrderById(id);
        if (order.isPresent()) {
            Order existingOrder = order.get();
            existingOrder.setStatus(updatedOrder.getStatus());
            existingOrder.setTotal(updatedOrder.getTotal());
            existingOrder.setOrderItems(updatedOrder.getOrderItems());
            // Si besoin : existingOrder.setUser(updatedOrder.getUser());
            Order savedOrder = orderService.updateOrder(existingOrder);
            return ResponseEntity.ok(savedOrder);
        }
        return ResponseEntity.notFound().build();
    }

    // ❌ Supprimer une commande
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderService.getOrderById(id).isPresent()) {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
