package com.monsieurabarbeback.mappers;

import java.util.List;

import com.monsieurabarbeback.controllers.dto.OrderResponse;
import com.monsieurabarbeback.entities.Order;

public class OrderMapper {
    public static OrderResponse toOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUser().getId());
        response.setTotal(order.getTotal());
        response.setCreatedAt(order.getCreatedAt());
        response.setStatus(order.getStatus());
        response.setUserMailAddress(order.getUser().getEmail());

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
    }
}
