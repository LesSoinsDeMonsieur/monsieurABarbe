package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.controllers.dto.OrderCreationRequest;
import com.monsieurabarbeback.controllers.dto.OrderResponse;
import com.monsieurabarbeback.controllers.dto.OrderUpdateRequest;
import com.monsieurabarbeback.entities.Order;
import com.monsieurabarbeback.entities.OrderItem;
import com.monsieurabarbeback.entities.OrderStatus;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.mappers.OrderMapper;
import com.monsieurabarbeback.services.OrderService;
import com.monsieurabarbeback.services.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.monsieurabarbeback.services.ProductService;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;

    // 🔍 Récupérer toutes les commandes
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
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
    /*@PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }*/

    // ✏️ Modifier une commande
    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> updateOrder(
            @PathVariable Long id,
            @RequestBody OrderUpdateRequest updateRequest) {

        Optional<Order> optionalOrder = orderService.getOrderById(id);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Order existingOrder = optionalOrder.get();

        if (updateRequest.getStatus() != null) {
            existingOrder.setStatus(updateRequest.getStatus());
        }
        if (updateRequest.getTotal() != null) {
            existingOrder.setTotal(updateRequest.getTotal());
        }
        if (updateRequest.getItems() != null && !updateRequest.getItems().isEmpty()) {
            // vider les anciens items et ajouter les nouveaux
            existingOrder.getOrderItems().clear();
            for (OrderUpdateRequest.OrderItemRequest itemRequest : updateRequest.getItems()) {
                OrderItem item = new OrderItem();
                item.setProduct(productService.getProductById(itemRequest.getProductId()).orElseThrow());
                item.setQuantity(itemRequest.getQuantity());
                item.setUnitPrice(itemRequest.getUnitPrice());
                existingOrder.addOrderItem(item);
            }
        }

        Order savedOrder = orderService.updateOrder(existingOrder);

        // transformer l'entité en DTO réponse
        OrderResponse response = OrderMapper.toOrderResponse(savedOrder);

        return ResponseEntity.ok(response);
    }


    // ❌ Supprimer une commande
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
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderCreationRequest orderRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<User> userOpt = userService.getUserByEmail(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Order order = new Order();
        order.setUser(userOpt.get());
        order.setStatus(OrderStatus.PENDING);

        double total = 0.0;

        for (OrderCreationRequest.OrderItemRequest itemRequest : orderRequest.getItems()) {
            Optional<Product> productOpt = productService.getProductById(itemRequest.getProductId());
            if (productOpt.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            Product product = productOpt.get();

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            order.addOrderItem(orderItem);

            total += product.getPrice() * itemRequest.getQuantity();
        }

        order.setTotal(total);
        Order savedOrder = orderService.createOrder(order);

        // Mapper vers DTO de réponse
        OrderResponse response = new OrderResponse();
        response.setId(savedOrder.getId());
        response.setUserId(savedOrder.getUser().getId());
        response.setTotal(savedOrder.getTotal());
        response.setCreatedAt(savedOrder.getCreatedAt());

        List<OrderResponse.OrderItemResponse> items = savedOrder.getOrderItems().stream().map(item -> {
            OrderResponse.OrderItemResponse itemResponse = new OrderResponse.OrderItemResponse();
            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setUnitPrice(item.getUnitPrice());

            return itemResponse;
        }).toList();

        response.setItems(items);

        return ResponseEntity.ok(response);
    }
}
