package com.monsieurabarbeback.controllers.dto;

import com.monsieurabarbeback.entities.OrderStatus;
import lombok.Data;
import java.util.List;

@Data
public class OrderUpdateRequest {
    private OrderStatus status;
    private Double total;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;
        private double unitPrice;
    }
}
