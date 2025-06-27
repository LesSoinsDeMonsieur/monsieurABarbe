package com.monsieurabarbeback.services;

import com.monsieurabarbeback.controllers.dto.OrderCreationRequest;
import com.monsieurabarbeback.controllers.dto.OrderResponse;
import com.monsieurabarbeback.entities.*;
import com.monsieurabarbeback.mappers.OrderMapper;
import com.monsieurabarbeback.repositories.OrderRepository;
import com.monsieurabarbeback.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    // 📦 Récupérer les commandes d’un utilisateur
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
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

        // Sauvegarde commande
        Order savedOrder = orderRepository.save(order);

        // Vide le panier de l'utilisateur après commande
        cartService.getCartByUser(user).ifPresent(cart -> cartService.deleteCart(cart.getId()));

        // Retourne DTO de réponse
        return Optional.of(OrderMapper.toOrderResponse(savedOrder));
    }

    // 📦 Mettre à jour une commande
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    // 📦 Supprimer une commande
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
