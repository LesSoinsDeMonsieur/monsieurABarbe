package com.monsieurabarbeback.services;

import com.monsieurabarbeback.controllers.dto.OrderCreationRequest;
import com.monsieurabarbeback.controllers.dto.OrderResponse;
import com.monsieurabarbeback.controllers.dto.OrderUpdateRequest;
import com.monsieurabarbeback.entities.*;
import com.monsieurabarbeback.mappers.OrderMapper;
import com.monsieurabarbeback.repositories.OrderRepository;
import com.monsieurabarbeback.repositories.ProductRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.monsieurabarbeback.mappers.OrderMapper;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductService productService;
    private final CartService cartService;

    // 📦 Récupérer toutes les commandes
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream().map(OrderMapper::toOrderResponse).toList();
    }



    public List<OrderResponse> getOrdersByUser(User user) {
        List<Order> userOrders = orderRepository.findByUser(user);

        return userOrders.stream().map(order -> {
            OrderResponse response = new OrderResponse();
            response.setStatus(order.getStatus());
            response.setId(order.getId());
            response.setUserId(order.getUser().getId());
            response.setTotal(order.getTotal());
            response.setCreatedAt(order.getCreatedAt());


            List<OrderResponse.OrderItemResponse> items = order.getOrderItems().stream().map(item -> {
                OrderResponse.OrderItemResponse itemResponse = new OrderResponse.OrderItemResponse();
                itemResponse.setProductId(item.getProduct().getId());
                itemResponse.setProductName(item.getProduct().getName());
                itemResponse.setQuantity(item.getQuantity());
                itemResponse.setUnitPrice(item.getUnitPrice());
                return itemResponse;
            }).toList();

            response.setItems(items);
            return response;
        }).toList();
    }

    // 📦 Récupérer une commande par ID
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    // 📦 Créer une commande avec gestion du stock
    @Transactional
    public Optional<OrderResponse> createOrder(OrderCreationRequest orderRequest, String username) {
        Optional<User> userOpt = userService.getUserByEmail(username);
        if (userOpt.isEmpty()) return Optional.empty();

        User user = userOpt.get();

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);

        double total = 0.0;

        for (OrderCreationRequest.OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productService.getProductById(itemRequest.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Produit introuvable avec l'id : " + itemRequest.getProductId()));

            // Vérifie stock disponible
            if (product.getStock() < itemRequest.getQuantity()) {
                throw new IllegalArgumentException("Stock insuffisant pour le produit : " + product.getName());
            }

            // Diminue le stock produit
            product.setStock(product.getStock() - itemRequest.getQuantity());
            productService.saveProduct(product);

            // Crée l'OrderItem
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            order.addOrderItem(orderItem);

            // Calcule le total
            total += product.getPrice() * itemRequest.getQuantity();
        }

        order.setTotal(total);

        order.setStatus(OrderStatus.PENDING);
        System.out.println(order.getStatus());


        // Sauvegarde commande
        Order savedOrder = orderRepository.save(order);

        // Vide le panier de l'utilisateur après commande
        
        cartService.getCartByUser(user).ifPresent(cart -> cartService.deleteCart(cart.getId()));

        // Retourne DTO de réponse
        return Optional.of(OrderMapper.toOrderResponse(savedOrder));
    }

    public Order updateOrder(Long orderId, OrderUpdateRequest orderRequest) {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new EntityNotFoundException("Commande avec l'id " + orderId + " introuvable.");
        }

        Order order = optOrder.get();

        // Mise à jour du statut et du total si fourni
        if (orderRequest.getStatus() != null) {
            order.setStatus(orderRequest.getStatus());
        }
        if (orderRequest.getTotal() != null) {
            order.setTotal(orderRequest.getTotal());
        }

        // Supprimer les anciens OrderItem
        order.getOrderItems().clear();

        // Recréer les nouveaux OrderItem à partir des items reçus
        for (OrderUpdateRequest.OrderItemRequest itemRequest : orderRequest.getItems()) {
            OrderItem orderItem = new OrderItem();
            
            // Recherche du produit par son ID
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Produit avec l'id " + itemRequest.getProductId() + " introuvable."));

            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(itemRequest.getUnitPrice());

            // Ajout à la commande
            order.addOrderItem(orderItem);
        }

        return orderRepository.save(order);
    }


    // 📦 Supprimer une commande
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
