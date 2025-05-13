package com.monsieurabarbeback.controllers.dto;

import com.monsieurabarbeback.entities.Product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemResponseDTO {
    private Long id;
    private Product product; // Contient les infos du produit
    private Integer quantity;
}
