package com.monsieurabarbeback.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductImageDTO {
    private Long id;
    private String fileName;
    private String imageUrl;
}
