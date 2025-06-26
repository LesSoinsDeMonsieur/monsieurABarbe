package com.monsieurabarbeback.controllers.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.monsieurabarbeback.entities.OrderStatus;

@Data
public class OrderResponse {
    private Long id;
    private Long userId;
    private double total;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;
    private OrderStatus status;

    @Data
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private Integer quantity;
        private double unitPrice;
    }
}
