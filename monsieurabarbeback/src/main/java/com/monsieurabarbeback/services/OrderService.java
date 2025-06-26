package com.monsieurabarbeback.services;

import com.monsieurabarbeback.controllers.dto.OrderResponse;
import com.monsieurabarbeback.entities.Order;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream().map(order -> {
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


    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
