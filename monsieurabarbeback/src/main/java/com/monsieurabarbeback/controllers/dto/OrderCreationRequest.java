package com.monsieurabarbeback.controllers.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderCreationRequest {
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;
    }
}
